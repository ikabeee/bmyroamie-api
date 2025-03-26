/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInterestDto } from './dto/create-user-interest.dto';
import { UpdateUserInterestDto } from './dto/update-user-interest.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserInterestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInterestDto: CreateUserInterestDto) {
    try {
      return await this.prisma.userInterest.create({
        data: createUserInterestDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'UserInterest already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.userInterest.findMany();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const userInterest = await this.prisma.userInterest.findUnique({
        where: { id },
      });
      if (!userInterest) {
        throw new HttpException('UserInterest not found', HttpStatus.NOT_FOUND);
      }
      return userInterest;
    } catch (error) {
      throw new HttpException(
        'Invalid request',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async update(id: number, updateUserInterestDto: UpdateUserInterestDto) {
    try {
      return await this.prisma.userInterest.update({
        where: { id },
        data: updateUserInterestDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            'UserInterest not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.userInterest.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            'UserInterest not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
