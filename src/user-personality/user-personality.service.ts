/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserPersonalityDto } from './dto/create-user-personality.dto';
import { UpdateUserPersonalityDto } from './dto/update-user-personality.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPersonalityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserPersonalityDto: CreateUserPersonalityDto) {
    try {
      return await this.prisma.userPersonality.create({
        data: createUserPersonalityDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'UserPersonality already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.userPersonality.findMany();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const userPersonality = await this.prisma.userPersonality.findUnique({
        where: { id },
      });
      if (!userPersonality) {
        throw new HttpException(
          'UserPersonality not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return userPersonality;
    } catch (error) {
      throw new HttpException(
        'Invalid request',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async update(id: number, updateUserPersonalityDto: UpdateUserPersonalityDto) {
    try {
      return await this.prisma.userPersonality.update({
        where: { id },
        data: updateUserPersonalityDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            'UserPersonality not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.userPersonality.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            'UserPersonality not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
