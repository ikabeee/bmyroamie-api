import { Role, Status } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsOptional()
  about_me: string;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  role: Role;
}
