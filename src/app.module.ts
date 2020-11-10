import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import * as path from 'path';
import { DatabaseModule } from 'src/common/processors/database/database.module';
import { CacheModule } from 'src/common/processors/cache/cache.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from './common/interceptor/cache.interceptor';
const ENV = process.env.NODE_ENV || 'dev';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      path: path.resolve(process.cwd(), 'env', `${ENV}.env`),
    }),
    DatabaseModule,
    CacheModule,
    ArticleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule {}
