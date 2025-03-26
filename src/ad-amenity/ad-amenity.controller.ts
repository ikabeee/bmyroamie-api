import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdAmenityService } from './ad-amenity.service';
import { CreateAdAmenityDto } from './dto/create-ad-amenity.dto';
import { UpdateAdAmenityDto } from './dto/update-ad-amenity.dto';

@Controller('ad-amenity')
export class AdAmenityController {
  constructor(private readonly adAmenityService: AdAmenityService) {}

  @Post()
  create(@Body() createAdAmenityDto: CreateAdAmenityDto) {
    return this.adAmenityService.create(createAdAmenityDto);
  }

  @Get()
  findAll() {
    return this.adAmenityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adAmenityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdAmenityDto: UpdateAdAmenityDto,
  ) {
    return this.adAmenityService.update(+id, updateAdAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adAmenityService.remove(+id);
  }
}
