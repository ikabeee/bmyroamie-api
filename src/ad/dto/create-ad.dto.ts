import { Status } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

export class CreateAdDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  num_rooms: number;

  @IsNotEmpty()
  @IsNumber()
  num_bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lon: number;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  stateId: number;
}
