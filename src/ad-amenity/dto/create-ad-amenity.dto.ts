import { IsInt } from 'class-validator';

export class CreateAdAmenityDto {
  @IsInt()
  adId: number;

  @IsInt()
  amenityId: number;
}
