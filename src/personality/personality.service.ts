import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PersonalityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PersonalityCreateInput) {
    try {
      return await this.prisma.personality.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error occurred while creating the personality',
        error,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.personality.findMany({
        include: {
          UserPersonality: {
            include: {
              User: true
            }
          }
        }
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.personality.findUnique({
        where: { id },
        include: {
          UserPersonality: {
            include: {
              User: true
            }
          }
        }
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, data: Prisma.PersonalityUpdateInput) {
    try {
      const personality = await this.prisma.personality.update({
        where: { id },
        data,
      });
      return personality;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Personality with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'Unexpected error occurred while updating the personality',
        error,
      );
    }
  }

  async delete(id: number) {
    try {
      const personality = await this.prisma.personality.delete({
        where: { id },
      });
      return personality;
    } catch (error) {
      if (error === 'P2025') {
        throw new NotFoundException(`Personality with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'Unexpected error occurred while deleting the personality',
      );
    }
  }

  private handlePrismaError(error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundException(`Personality not found`);
    }
    throw new InternalServerErrorException(
      'Unexpected error occurred while fetching the personality',
      error,
    );
  }
}
