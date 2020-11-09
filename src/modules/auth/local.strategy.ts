import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiException } from 'src/common/exceptions/api.exception';
import { ApiErrorCode } from 'src/common/enums/api.error.code.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new ApiException('登陆失败，用户名或密码错误', ApiErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}