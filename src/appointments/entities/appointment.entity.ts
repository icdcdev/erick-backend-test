import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusAppointment } from '../enums/status';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    type: String,
    trim: true,
    ref: 'Client',
  })
  clientId: MongooseSchema.Types.ObjectId;
  @Prop({
    type: String,
    trim: true,
    ref: 'Vehicle',
  })
  vehicleId: MongooseSchema.Types.ObjectId;
  @Prop({
    type: Date,
  })
  startDate: Date;
  @Prop({
    type: Date,
  })
  endDate: Date;
  @Prop({
    trim: true,
    enum: StatusAppointment,
    default: StatusAppointment.HABILITADA,
  })
  status: StatusAppointment;
  @Prop({
    type: String,
    trim: true,
  })
  comment: string;
  @Prop({
    type: Boolean,
    default: false,
    index: true,
  })
  isDeleted: Boolean;
  @Prop({
    type: Date,
  })
  createdAt: Date;
  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
