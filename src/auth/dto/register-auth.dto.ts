import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
