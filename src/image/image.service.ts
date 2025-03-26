import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createImageDto: CreateImageDto) {
    try {
      const image = await this.prisma.image.create({
        data: createImageDto,
      });
      return image;
    } catch (error) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.image.findMany();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const image = await this.prisma.image.findUnique({ where: { id } });
      if (!image) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      return image;
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    try {
      const image = await this.prisma.image.update({
        where: { id },
        data: updateImageDto,
      });
      return image;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const image = await this.prisma.image.delete({ where: { id } });
      return image;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
