import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusAppointment } from '../enums/status';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    type: String,
    trim: true,
  })
  clientId: string;
  @Prop({
    type: String,
    trim: true,
  })
  vehicleId: string;
  @Prop({
    type: Date,
  })
  date: Date;
  @Prop({
    trim: true,
    enum: StatusAppointment,
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
