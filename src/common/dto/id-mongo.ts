import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import { SafeMongoIdTransform } from '../helpers/cast-id-mongo';

export class MongoId {
  @IsMongoId()
  @Transform((value) => SafeMongoIdTransform(value))
  id: string;
}
