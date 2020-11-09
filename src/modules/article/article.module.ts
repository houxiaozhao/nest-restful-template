import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleProvider } from './article.model';
import { ArticleService } from './article.service';
// import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleProvider],
})
export class ArticleModule {}
