import { IsInt } from 'class-validator';

export class CreateUserPersonalityDto {
  @IsInt()
  userId: number;

  @IsInt()
  personalityId: number;
}
