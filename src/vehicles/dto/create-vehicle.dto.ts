import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
    message: 'Invalid UUID format',
  })
  clientId: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message:
      'El VIN debe tener 17 caracteres alfanuméricos y no incluir las letras I, O o Q.',
  })
  vin: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{5}$/, {
    message: 'Las placas deben tener 5 caracteres alfanuméricos.',
  })
  licensePlates: string;
  @IsString()
  @IsNotEmpty()
  color: string;
  @IsInt({ message: 'El año debe ser un número entero.' })
  @Min(1900, { message: 'El año minimo es 1900.' })
  @Max(2200, { message: 'El año maximo es 2200.' })
  year: number;
  @IsString()
  @IsNotEmpty()
  model: string;
}
