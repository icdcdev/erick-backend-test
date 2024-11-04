import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class PaginationDto {
  @Min(0)
  @Type(() => Number)
  skip: number;
  @Min(1)
  @Max(30)
  @Type(() => Number)
  limit: number;
}
