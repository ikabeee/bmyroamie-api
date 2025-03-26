import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() user: RegisterAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, payload } = await this.authService.register(user);
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'User registered successfully', user: payload };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, payload } = await this.authService.login(user);
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'Login successful', user: payload };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'Logout successful' };
  }
}
