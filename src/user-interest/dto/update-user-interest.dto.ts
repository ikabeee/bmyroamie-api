import { PartialType } from '@nestjs/swagger';
import { CreateUserInterestDto } from './create-user-interest.dto';

export class UpdateUserInterestDto extends PartialType(CreateUserInterestDto) {}
