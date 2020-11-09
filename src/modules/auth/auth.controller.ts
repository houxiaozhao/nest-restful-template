import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, ProfileDto, SignupDto, UserinfoDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @ApiBody({
    type: SignupDto,
  })
  @ApiResponse({
    status: 200,
    type: UserinfoDto,
  })
  //TODO: 验证用户名密码长度
  async signup(@Body() { username, password }) {
    const user = await this.authService.signup(username, password);
    return {
      _id: user._id,
      username: user.username,
      access_token: await this.authService.signJWT(user.username, user._id),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    type: UserinfoDto,
  })
  async login(@Request() req) {
    return {
      _id: req.user.userid,
      username: req.user.username,
      access_token: await this.authService.signJWT(
        req.user.username,
        req.user.userid,
      ),
    };
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ProfileDto,
  })
  async getProfile(@Request() req) {
    return {
      _id: req.user.userid,
      username: req.user.username,
    };
  }
}
