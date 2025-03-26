import { PartialType } from '@nestjs/swagger';
import { CreateUserPersonalityDto } from './create-user-personality.dto';

export class UpdateUserPersonalityDto extends PartialType(CreateUserPersonalityDto) {}
