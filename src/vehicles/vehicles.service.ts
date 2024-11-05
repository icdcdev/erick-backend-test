import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const { clientId, ...vehicleData } = createVehicleDto;
    const client = await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return await this.prisma.vehicle.create({
      data: {
        ...vehicleData,
        client: {
          connect: { id: clientId },
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;
    return await this.prisma.vehicle.findMany({
      skip,
      take: limit,
      include: {
        client: true,
      },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
      include: {
        client: true,
      },
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const { clientId } = updateVehicleDto;
    if (clientId) {
      const client = await this.prisma.client.findUnique({
        where: {
          id: clientId,
        },
      });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }
    const vehicle = await this.prisma.vehicle.update({
      where: {
        id,
      },
      data: updateVehicleDto,
      include: {
        client: true,
      },
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async remove(id: string) {
    const vehicle = await this.prisma.vehicle.delete({
      where: {
        id,
      },
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }
}
