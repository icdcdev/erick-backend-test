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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MongoId } from 'src/common/dto/id-mongo';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param() params: MongoId) {
    return this.clientService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: MongoId, @Body() updatePatientDto: UpdateClientDto) {
    return this.clientService.update(params.id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param() params: MongoId) {
    return this.clientService.delete(params.id);
  }
}
