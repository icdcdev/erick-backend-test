import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClientService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createClientDto: CreateClientDto) {
    return await this.client.create({
      data: createClientDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;
    return await this.client.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    const client = await this.client.findUnique({
      where: {
        id,
      },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.client.update({
      where: {
        id,
      },
      data: updateClientDto,
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async delete(id: string) {
    const client = await this.client.delete({
      where: {
        id,
      },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}
