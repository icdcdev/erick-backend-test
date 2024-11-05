import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DateRangeDto } from './dto/date-filter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { clientId, startDate, endDate, vehicleId, ...appointmentData } =
      createAppointmentDto;
    const [client, vehicle] = await Promise.all([
      this.prisma.client.findUnique({
        where: {
          id: clientId,
        },
      }),
      this.prisma.vehicle.findUnique({
        where: {
          id: vehicleId,
        },
      }),
    ]);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    await this.validateDateAppointment(new Date(startDate), new Date(endDate));
    return await this.prisma.appointment.create({
      data: {
        ...appointmentData,
        client: {
          connect: { id: clientId },
        },
        vehicle: {
          connect: { id: vehicleId },
        },
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      include: {
        client: true,
        vehicle: true,
      },
    });
  }

  async validateDateAppointment(startDate: Date, endDate: Date) {
    if (startDate >= endDate) {
      throw new ConflictException(
        'La fecha de inicio no puede ser posterior o igual a la fecha de fin',
      );
    }
    const appointments = await this.prisma.appointment.findMany({
      where: {
        OR: [
          { startDate: { lte: endDate }, endDate: { gte: startDate } },
          { startDate: { gte: startDate, lte: endDate } },
          { endDate: { gte: startDate, lte: endDate } },
        ],
      },
    });
    if (appointments.length > 0) {
      throw new ConflictException('Appointment already exists');
    }
  }

  async findAllByDateRange(dateFilterDto: DateRangeDto) {
    const { skip, limit, startDate, endDate } = dateFilterDto;
    return await this.prisma.appointment.findMany({
      where: {
        startDate: { gte: new Date(startDate) },
        endDate: { lte: new Date(endDate) },
      },
      skip,
      take: limit,
      include: {
        client: true,
        vehicle: true,
      },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        client: true,
        vehicle: true,
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const { startDate, endDate } = updateAppointmentDto;
    await this.validateDateAppointment(startDate, endDate);
    const appointment = await this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...updateAppointmentDto,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      include: {
        client: true,
        vehicle: true,
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointment.delete({
      where: {
        id,
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }
}
