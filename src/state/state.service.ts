import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStateDto: CreateStateDto) {
    try {
      const state = await this.prisma.state.create({
        data: createStateDto,
      });
      return state;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('State already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.state.findMany();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const state = await this.prisma.state.findUnique({
        where: { id },
      });
      if (!state) {
        throw new HttpException('State not found', HttpStatus.NOT_FOUND);
      }
      return state;
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    try {
      const state = await this.prisma.state.update({
        where: { id },
        data: updateStateDto,
      });
      return state;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('State not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const state = await this.prisma.state.delete({
        where: { id },
      });
      return state;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('State not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  async forbiddenAction() {
    throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
  }
}
