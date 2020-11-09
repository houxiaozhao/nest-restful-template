import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('secret'),
      passReqToCallback: true,
    });
  }
  async validate(request, payload) {
    return { userid: payload.sub, username: payload.username };
  }

  // async validate(payload: any) {
  //   console.log('payload', payload);
  //   return { userid: payload.sub, username: payload.username };
  // }
}
