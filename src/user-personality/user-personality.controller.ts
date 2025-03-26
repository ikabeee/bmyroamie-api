import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPersonalityService } from './user-personality.service';
import { CreateUserPersonalityDto } from './dto/create-user-personality.dto';
import { UpdateUserPersonalityDto } from './dto/update-user-personality.dto';

@Controller('user-personality')
export class UserPersonalityController {
  constructor(
    private readonly userPersonalityService: UserPersonalityService,
  ) {}

  @Post()
  create(@Body() createUserPersonalityDto: CreateUserPersonalityDto) {
    return this.userPersonalityService.create(createUserPersonalityDto);
  }

  @Get()
  findAll() {
    return this.userPersonalityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPersonalityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPersonalityDto: UpdateUserPersonalityDto,
  ) {
    return this.userPersonalityService.update(+id, updateUserPersonalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPersonalityService.remove(+id);
  }
}
