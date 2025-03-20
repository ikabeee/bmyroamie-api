import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/register')
  register(@Body() user: RegisterAuthDto) {
    return this.authService.reguster(user);
  }

  @Post('/login')
  login(@Body() user: LoginAuthDto) {
    return this.authService.login(user);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
  }
}
