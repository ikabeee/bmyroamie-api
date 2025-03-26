import { IsInt } from 'class-validator';

export class CreateUserInterestDto {
  @IsInt()
  userId: number;

  @IsInt()
  interestId: number;
}
