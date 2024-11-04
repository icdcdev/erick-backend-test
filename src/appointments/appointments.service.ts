import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './entities/appointment.entity';
import { Model } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { DateRangeDto } from './dto/date-filter';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<Vehicle>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { clientId, startDate, endDate } = createAppointmentDto;
    const client = await this.clientModel.find({
      _id: clientId,
      isDeleted: false,
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    const vehicle = await this.vehicleModel.find({
      _id: createAppointmentDto.vehicleId,
      isDeleted: false,
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    await this.validateDateAppointment(startDate, endDate);
    return await this.appointmentModel.create(createAppointmentDto);
  }

  async validateDateAppointment(startDate: Date, endDate: Date) {
    if (startDate >= endDate) {
      throw new ConflictException(
        'La fecha de inicio no puede ser posterior o igual a la fecha de fin',
      );
    }
    const appointments = await this.appointmentModel.findOne({
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });
    if (appointments) {
      throw new ConflictException('Appointment already exists');
    }
  }

  async findAllByDateRange(dateFilterDto: DateRangeDto) {
    const { skip, limit, startDate, endDate } = dateFilterDto;
    return await this.appointmentModel
      .find({
        isDeleted: false,
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
      })
      .skip(skip)
      .limit(limit)
      .populate(['clientId', 'vehicleId']);
  }

  async findOne(id: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment || appointment.isDeleted) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const { startDate, endDate, clientId, vehicleId } = updateAppointmentDto;
    if (clientId) {
      const client = await this.clientModel.findById(clientId);
      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }
    if (vehicleId) {
      const vehicle = await this.vehicleModel.findById(vehicleId);
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
    }
    await this.validateDateAppointment(startDate, endDate);
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      id,
      updateAppointmentDto,
      {
        new: true,
      },
    );
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.appointmentModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }
}
