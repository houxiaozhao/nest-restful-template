import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiErrorCode } from '../enums/api.error.code.enum';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class MongoIdPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    try {
      return Types.ObjectId(value);
    } catch (error) {
      throw new ApiException(
        'ID无效',
        ApiErrorCode.ID_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
