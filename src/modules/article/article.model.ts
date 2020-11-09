import { prop, plugin, defaultClasses, Ref } from '@typegoose/typegoose';
import { IsString, IsArray, IsNotEmpty, ArrayUnique } from 'class-validator';
import * as mongoosePaginate from 'mongoose-paginate';
import { getProviderByTypegooseClass } from 'src/common/transformers/model.transformer';
import { User } from 'src/modules/user/user.model';

@plugin(mongoosePaginate)
export class Article extends defaultClasses.TimeStamps {
  @IsString()
  @prop({ required: true })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '文章标题？' })
  @prop({ required: true })
  content: string;

  @IsArray()
  @ArrayUnique()
  @prop({ type: () => [String] })
  tags: string[];

  @prop({ ref: () => User, required: true, index: true })
  user: Ref<User>;
}
export const ArticleProvider=getProviderByTypegooseClass(Article);