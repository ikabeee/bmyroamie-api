/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateAdAmenityDto } from './dto/create-ad-amenity.dto';
import { UpdateAdAmenityDto } from './dto/update-ad-amenity.dto';

@Injectable()
export class AdAmenityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdAmenityDto: CreateAdAmenityDto) {
    try {
      return await this.prisma.adAmenity.create({
        data: createAdAmenityDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'AdAmenity already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.adAmenity.findMany({
        include: { Ad: true, Amenity: true },
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const adAmenity = await this.prisma.adAmenity.findUnique({
        where: { id },
        include: { Ad: true, Amenity: true },
      });
      if (!adAmenity) {
        throw new HttpException('AdAmenity not found', HttpStatus.NOT_FOUND);
      }
      return adAmenity;
    } catch (error) {
      throw new HttpException(
        'Invalid request',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async update(id: number, updateAdAmenityDto: UpdateAdAmenityDto) {
    try {
      return await this.prisma.adAmenity.update({
        where: { id },
        data: updateAdAmenityDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('AdAmenity not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.adAmenity.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('AdAmenity not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
