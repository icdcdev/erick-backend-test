import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TimeZone } from 'src/common/enums/time_zone';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  paternalSurname: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  maternalSurname: string;
  @IsEnum(TimeZone)
  timeZone: TimeZone;
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  address: string;
}
