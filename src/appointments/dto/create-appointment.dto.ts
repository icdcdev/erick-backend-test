import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StatusAppointment } from '../enums/status';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
    message: 'Invalid UUID format',
  })
  clientId: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
    message: 'Invalid UUID format',
  })
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
