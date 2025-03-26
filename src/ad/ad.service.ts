import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdDto: CreateAdDto) {
    try {
      return await this.prisma.ad.create({
        data: createAdDto,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.ad.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching ads', error);
    }
  }

  async findOne(id: number) {
    try {
      const ad = await this.prisma.ad.findUnique({
        where: { id },
      });

      if (!ad) throw new NotFoundException(`Ad with ID ${id} not found`);

      return ad;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, updateAdDto: UpdateAdDto) {
    try {
      const ad = await this.prisma.ad.findUnique({ where: { id } });
      if (!ad) throw new NotFoundException(`Ad with ID ${id} not found`);

      return await this.prisma.ad.update({
        where: { id },
        data: updateAdDto,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async delete(id: number) {
    try {
      const ad = await this.prisma.ad.findUnique({ where: { id } });
      if (!ad) throw new NotFoundException(`Ad with ID ${id} not found`);

      return await this.prisma.ad.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException('A record with this data already exists');

        case 'P2025':
          throw new NotFoundException('Record not found');

        default:
          throw new InternalServerErrorException('Database error');
      }
    } else if (error === '401') {
      throw new UnauthorizedException('Unauthorized access');
    } else if (error === '403') {
      throw new ForbiddenException('Access denied');
    } else if (error === '422') {
      throw new UnprocessableEntityException('Invalid data provided');
    } else {
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
