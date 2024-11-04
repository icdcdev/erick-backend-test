import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DateRangeDto } from './dto/date-filter';
import { MongoId } from 'src/common/dto/id-mongo';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll(@Query() dateFilterDto: DateRangeDto) {
    return this.appointmentsService.findAllByDateRange(dateFilterDto);
  }

  @Patch(':id')
  update(
    @Param() params: MongoId,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(params.id, updateAppointmentDto);
  }

  @Get(':id')
  findOne(@Param() params: MongoId) {
    return this.appointmentsService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param() params: MongoId) {
    return this.appointmentsService.remove(params.id);
  }
}
