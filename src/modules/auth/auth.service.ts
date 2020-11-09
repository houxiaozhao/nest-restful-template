import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiErrorCode } from 'src/common/enums/api.error.code.enum';
import { ApiException } from 'src/common/exceptions/api.exception';
import { UserService } from '../user/user.service';
import Sha256 = require('crypto-js/hmac-sha256');
import { ConfigService } from 'nestjs-config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async signup(username, password) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new ApiException(
        '用户名重复',
        ApiErrorCode.USER_DUPLICATE,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.create({
      username,
      password,
    });
  }
  async signJWT(username, userid) {
    return this.jwtService.sign({
      username: username,
      sub: userid,
    });
  }
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByUsername(username);
    if (
      user &&
      user.password ===
        Sha256(pass + user.salt, this.config.get('secret')).toString()
    ) {
      // 自动把user 附加到request对象上
      return {
        userid: user._id,
        username: user.username,
      };
    }
    return null;
  }
}
