import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    return await this.clientModel.create(createClientDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;
    return await this.clientModel
      .find({ isDeleted: false })
      .skip(skip)
      .limit(limit);
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id);
    if (!client || client.isDeleted) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientModel.findByIdAndUpdate(
      id,
      updateClientDto,
      {
        new: true,
      },
    );
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async delete(id: string) {
    const client = await this.clientModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}
