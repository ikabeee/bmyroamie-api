import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MunicipalityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMunicipalityDto: CreateMunicipalityDto) {
    try {
      const municipality = await this.prisma.municipality.create({
        data: createMunicipalityDto,
      });
      return municipality;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Municipality already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.municipality.findMany();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const municipality = await this.prisma.municipality.findUnique({
        where: { id },
      });
      if (!municipality) {
        throw new HttpException('Municipality not found', HttpStatus.NOT_FOUND);
      }
      return municipality;
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    try {
      const municipality = await this.prisma.municipality.update({
        where: { id },
        data: updateMunicipalityDto,
      });
      return municipality;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Municipality not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const municipality = await this.prisma.municipality.delete({
        where: { id },
      });
      return municipality;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Municipality not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  async forbiddenAction() {
    throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
  }
}
