import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() body: { userId: number; adId: number }) {
    return this.favoriteService.create(body.userId, body.adId);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.favoriteService.findByUser(+userId);
  }

  @Get('ad/:adId')
  findByAd(@Param('adId') adId: string) {
    return this.favoriteService.findByAd(+adId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteService.delete(+id);
  }
}
