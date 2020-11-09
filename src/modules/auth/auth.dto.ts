import { OmitType } from '@nestjs/swagger';

export class SignupDto {
  username: string;
  password: string;
}
export class LoginDto {
  username: string;
  password: string;
}
export class UserinfoDto {
  _id: string;
  username: string;
  access_token: string;
}
export class ProfileDto extends OmitType(UserinfoDto, ['access_token'] as const) {}
