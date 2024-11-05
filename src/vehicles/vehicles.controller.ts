import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MongoId } from 'src/common/dto/id-mongo';
import { Uuid } from 'src/common/dto/id-uuid';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.vehiclesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param() params: Uuid) {
    return this.vehiclesService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: Uuid, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(params.id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param() params: Uuid) {
    return this.vehiclesService.remove(params.id);
  }
}
