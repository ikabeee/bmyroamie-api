import { PartialType } from '@nestjs/swagger';
import { RegisterAuthDto } from './register-auth.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto extends PartialType(RegisterAuthDto) {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
