# nest-restful-template

基于 nestjs mongoose jwt 的 restful 模板程序
用于快速搭建服务端程序

## 涉及技术框架

- nestjs 服务框架
- mongoose 操作数据库的库
  - typegoose 使用类定义数据模型
  - nestjs-typegoose
  - mongoose-paginate 分页插件
- jwt 生成验证 token
- swagger 文档生成

## 配置文件

nestjs-config 管理配置文件

```
/env/
/src/config/
```
## Redis 缓存基本用法
```
// controller
@HttpCache(ARTICLE, 60)
@UseInterceptors(HttpCacheInterceptor)

// module
import { CacheModule } from 'src/common/processors/cache/cache.module';
@Module({
  imports: [CacheModule]
})
```

## 功能

- [x] 用户登陆注册
- [x] jwt验证
- [x] 增删改查，分页查询
- [x] 统一异常处理（使用业务状态码）
- [x] 统一返回结构
- [x] 自定义user装饰器 src/common/decorator/user.decorator
- [x] mongo objectid 示例管道
- [x] 跨域处理
- [ ] 文件上传示例
- [x] redis缓存
- [ ] 异常发送邮件提醒


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 文档地址

http://127.0.0.1:3001/doc

## 异常处理

异常过滤器

- src\common\filters\http-exception.filter.ts

自定义 api 异常

- src\common\exceptions\api.exception.ts

拦截器

- src\common\interceptor\exception.interceptor.ts
- src\common\interceptor\transform.interceptor.ts

### 异常使用方式

```javascript
throw new ApiException(
  'ID无效',
  ApiErrorCode.ID_INVALID,
  HttpStatus.BAD_REQUEST,
);
// {
//   "status": 400,
//   "timestamp": "2020-10-26T01:20:18.452Z",
//   "path": "/article/5f93df3b03ac4483c069b0092",
//   "errorCode": 10001,
//   "message": "ID无效"
// }
throw new HttpException(
  {
    message: '请求参数id 必传',
    errorCode: '10000',
  },
  HttpStatus.BAD_REQUEST,
);
```
