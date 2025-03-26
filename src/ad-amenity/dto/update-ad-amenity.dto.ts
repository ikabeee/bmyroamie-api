import { PartialType } from '@nestjs/swagger';
import { CreateAdAmenityDto } from './create-ad-amenity.dto';

export class UpdateAdAmenityDto extends PartialType(CreateAdAmenityDto) {}
