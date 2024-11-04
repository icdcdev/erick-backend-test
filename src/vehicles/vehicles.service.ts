import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from './entities/vehicle.entity';
import { Model } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<Vehicle>,
  ) {}
  async create(createVehicleDto: CreateVehicleDto) {
    const { clientId } = createVehicleDto;
    const client = await this.clientModel.find({
      _id: clientId,
      isDeleted: false,
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return await this.vehicleModel.create(createVehicleDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;
    return await this.vehicleModel
      .find({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .populate('clientId');
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleModel.findById(id).populate('clientId');
    if (!vehicle || vehicle.isDeleted) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleModel.findByIdAndUpdate(
      id,
      updateVehicleDto,
      {
        new: true,
      },
    );
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async remove(id: string) {
    const vehicle = await this.vehicleModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }
}
