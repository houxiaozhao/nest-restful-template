import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import {
  ArticleDto,
  CreateArticleDto,
  IdDto,
  UpdateArticleDte,
} from './article.dto';
import { ArticleService } from './article.service';
import { trim } from 'lodash';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Article } from './article.model';
@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    description: '多篇文章',
    type: ArticleDto,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'search', required: false })
  async index(
    @Query('page') page = 1,
    @Query('sort') sort?: string,
    @Query('search') search?: string,
  ) {
    const querys: any = {};
    if (trim(search)) {
      const searchRegExp = new RegExp(trim(search), 'i');
      querys.$or = [{ title: searchRegExp }, { content: searchRegExp }];
    }
    return await this.articleService.index(querys, { page, sort });
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: '一篇文章',
    type: ArticleDto,
  })
  async show(@Param('id', new MongoIdPipe()) id) {
    return this.articleService.show(id);
  }

  @UseGuards(JWTAuthGuard)
  @Post()
  @ApiBody({
    type: CreateArticleDto,
  })
  @ApiResponse({
    status: 200,
    type: ArticleDto,
  })
  @ApiBearerAuth()
  async create(@Body() body: Article, @User() user) {
    return this.articleService.create(
      Object.assign(body, { user: user.userid }),
    );
  }

  @UseGuards(JWTAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateArticleDte })
  @ApiResponse({
    status: 200,
    type: IdDto,
  })
  @ApiBearerAuth()
  async update(@Param('id', new MongoIdPipe()) id, @Body() body, @User() user) {
    return this.articleService.update(id, body, user.userid);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: IdDto,
  })
  @ApiBearerAuth()
  async delete(@Param('id', new MongoIdPipe()) id, @User() user) {
    return this.articleService.delete(id, user.userid);
  }
}
