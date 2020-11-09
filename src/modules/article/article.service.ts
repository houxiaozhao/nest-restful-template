import { Injectable } from '@nestjs/common';
import { Types, PaginateResult } from 'mongoose';
import { MongooseModel } from 'src/common/interfaces/mongoose.interface';
import { Article } from './article.model';
import { InjectModel } from 'src/common/transformers/model.transformer';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article) private articleModel: MongooseModel<any>,
  ) {}
  async index(querys, options): Promise<PaginateResult<Article>> {
    options.populate = { path: 'user', select: 'username' };
    return this.articleModel.paginate(querys, options);
  }
  async show(id: Types.ObjectId | string): Promise<Article> {
    return this.articleModel
      .findById(id)
      .populate({ path: 'user', select: 'username' });
  }
  async create(payload: Article): Promise<Article> {
    return this.articleModel.create(payload);
  }
  async update(
    id: Types.ObjectId | string,
    payload: Article,
    userid: Types.ObjectId | string,
  ): Promise<Article> {
    Reflect.deleteProperty(payload, 'createdAt');
    Reflect.deleteProperty(payload, 'updatedAt');
    return this.articleModel
      .findOneAndUpdate(
        {
          _id: id,
          user: userid,
        },
        payload,
        { new: true },
      )
      .exec();
  }
  async delete(
    id: Types.ObjectId | string,
    userid: Types.ObjectId | string,
  ): Promise<Article> {
    return this.articleModel
      .findOneAndDelete({
        _id: id,
        user: userid,
      })
      .exec();
  }
}
