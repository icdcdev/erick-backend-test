import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Vehicle {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    trim: true,
  })
  clientId: MongooseSchema.Types.ObjectId;
  @Prop({
    type: String,
    trim: true,
  })
  vin: string;
  @Prop({
    type: String,
    trim: true,
  })
  licensePlates: string;
  @Prop({
    type: String,
    trim: true,
  })
  color: string;
  @Prop({
    type: Number,
  })
  year: number;
  @Prop({
    type: String,
    trim: true,
  })
  model: string;
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

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
