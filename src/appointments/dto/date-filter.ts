import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class DateRangeDto {
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria.' })
  @IsDateString(
    {},
    {
      message:
        'La fecha de inicio debe tener un formato de fecha válido (YYYY-MM-DD).',
    },
  )
  startDate: string;

  @IsNotEmpty({ message: 'La fecha de fin es obligatoria.' })
  @IsDateString(
    {},
    {
      message:
        'La fecha de fin debe tener un formato de fecha válido (YYYY-MM-DD).',
    },
  )
  @ValidateIf((o) => new Date(o.endDate) >= new Date(o.startDate), {
    message: 'La fecha de fin no puede ser anterior a la fecha de inicio.',
  })
  endDate: string;
  @Min(0)
  @Type(() => Number)
  skip: number;
  @Min(1)
  @Max(30)
  @Type(() => Number)
  limit: number;
}
