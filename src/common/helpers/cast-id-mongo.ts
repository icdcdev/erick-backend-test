import { BadRequestException } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';

export const SafeMongoIdTransform = ({ value }) => {
  try {
    if (
      mongoose.isValidObjectId(value) &&
      Types.ObjectId.createFromHexString(value).toString() === value
    ) {
      return value;
    }
    throw new BadRequestException('invalid id');
  } catch (error) {
    throw new BadRequestException('invalid id');
  }
};
