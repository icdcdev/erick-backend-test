import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return await this.prisma.client.create({
      data: createClientDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;
    return await this.prisma.client.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
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
    const client = await this.prisma.client.update({
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
    const client = await this.prisma.client.delete({
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
