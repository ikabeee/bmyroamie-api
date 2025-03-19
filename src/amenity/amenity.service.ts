import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AmenityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAmenityDto: CreateAmenityDto) {
    try {
      const amenity = await this.prisma.amenity.create({
        data: createAmenityDto,
      });
      return amenity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Amenity already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.amenity.findMany();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const amenity = await this.prisma.amenity.findUnique({
        where: { id },
      });
      if (!amenity) {
        throw new HttpException('Amenity not found', HttpStatus.NOT_FOUND);
      }
      return amenity;
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, updateAmenityDto: UpdateAmenityDto) {
    try {
      const amenity = await this.prisma.amenity.update({
        where: { id },
        data: updateAmenityDto,
      });
      return amenity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Amenity not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const amenity = await this.prisma.amenity.delete({
        where: { id },
      });
      return amenity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Amenity not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  async forbiddenAction() {
    throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
  }
}
