import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './entities/appointment.entity';
import { Model } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { clientId } = createAppointmentDto;
    const client = await this.clientModel.findById(clientId);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return await this.appointmentModel.create(createAppointmentDto);
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
