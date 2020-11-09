import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { getProviderByTypegooseClass } from 'src/common/transformers/model.transformer';

export class User {
  @IsString()
  @prop({ required: true, unique: true })
  username: string;

  @IsString()
  @prop({ required: true })
  password: string;

  @IsString()
  @prop({ required: true })
  salt: string;

  @IsString()
  status: string[];
}
export const UserProvider=getProviderByTypegooseClass(User);
