import { OmitType, PartialType } from '@nestjs/swagger';

export class ArticleDto {
  _id: string;
  title: string;
  content?: string;
  tags: string[];
}
export class IdDto{
  _id:string
}
export class CreateArticleDto extends OmitType(ArticleDto, ['_id'] as const) {} //从ArticleDto删除_id
export class UpdateArticleDte extends PartialType(CreateArticleDto) {} // 全部改为可选
