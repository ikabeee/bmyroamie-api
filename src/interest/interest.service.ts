import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InterestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.InterestCreateInput) {
    try {
      return await this.prisma.interest.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error occurred while creating the interest',
        error,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.interest.findMany({
        include: {
          UserInterest: {
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
      return await this.prisma.interest.findUnique({
        where: { id },
        include: {
          UserInterest: {
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

  async update(id: number, data: Prisma.InterestUpdateInput) {
    try {
      const interest = await this.prisma.interest.update({
        where: { id },
        data,
      });
      return interest;
    } catch (error) {
      if (error === 'P2025') {
        throw new NotFoundException(`Interest with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'Unexpected error occurred while updating the interest',
      );
    }
  }

  async delete(id: number) {
    try {
      const interest = await this.prisma.interest.delete({
        where: { id },
      });
      return interest;
    } catch (error) {
      if (error === 'P2025') {
        throw new NotFoundException(`Interest with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'Unexpected error occurred while deleting the interest',
      );
    }
  }

  private handlePrismaError(error: any) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException(
      'Unexpected error occurred while querying the interest',
      error,
    );
  }
}
