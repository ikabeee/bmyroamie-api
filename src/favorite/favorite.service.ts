import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, adId: number) {
    try {
      const favorite = await this.prisma.favorite.create({
        data: { userId, adId },
      });
      return favorite;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Favorite already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.favorite.findMany({
        include: { User: true, Ad: true },
      });
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByUser(userId: number) {
    try {
      return await this.prisma.favorite.findMany({
        where: { userId },
        include: { Ad: true },
      });
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByAd(adId: number) {
    try {
      return await this.prisma.favorite.findMany({
        where: { adId },
        include: { User: true },
      });
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async delete(id: number) {
    try {
      const favorite = await this.prisma.favorite.delete({
        where: { id },
      });
      return favorite;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
