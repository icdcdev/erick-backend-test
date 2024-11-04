import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { StatusAppointment } from '../enums/status';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  clientId: string;
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  vehicleId: string;
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, {
    message: 'La fecha debe estar en el formato YYYY-MM-DDTHH:MM:SS ',
  })
  startDate: Date;
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, {
    message: 'La fecha debe estar en el formato YYYY-MM-DDTHH:MM:SS ',
  })
  endDate: Date;
  @IsOptional()
  @MinLength(5)
  @MaxLength(500)
  @IsString()
  comment: string;
  @IsOptional()
  @IsEnum(StatusAppointment)
  status: StatusAppointment;
}
