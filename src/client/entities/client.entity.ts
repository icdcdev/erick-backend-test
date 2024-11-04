import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { TimeZone } from 'src/common/enums/time_zone';

@Schema({ timestamps: true })
export class Client {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    type: String,
    trim: true,
  })
  name: string;
  @Prop({
    type: String,
    trim: true,
  })
  paternalSurname: string;
  @Prop({
    type: String,
    trim: true,
  })
  maternalSurname: string;
  @Prop({
    trim: true,
    enum: TimeZone,
  })
  timeZone: TimeZone;
  @Prop({
    type: String,
    trim: true,
  })
  address: string;
  @Prop({
    type: Boolean,
    default: false,
    index: true,
  })
  isDeleted: boolean;
  @Prop({
    type: Date,
  })
  createdAt: Date;
  @Prop({
    type: Date,
  })
  uddatedAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
