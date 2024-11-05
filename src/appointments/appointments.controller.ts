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
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DateRangeDto } from './dto/date-filter';
import { Uuid } from 'src/common/dto/id-uuid';

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
    @Param() params: Uuid,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(params.id, updateAppointmentDto);
  }

  @Get(':id')
  findOne(@Param() params: Uuid) {
    return this.appointmentsService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param() params: Uuid) {
    return this.appointmentsService.remove(params.id);
  }
}
