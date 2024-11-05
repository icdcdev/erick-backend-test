import { IsNotEmpty, Matches } from 'class-validator';

export class Uuid {
  @IsNotEmpty()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
    message: 'Invalid UUID format',
  })
  id: string;
}
