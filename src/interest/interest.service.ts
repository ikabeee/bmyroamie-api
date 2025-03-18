import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
      throw new InternalServerErrorException('Unexpected error occurred while creating the interest');
    }
  }

  async findAll() {
    return await this.prisma.interest.findMany();
  }

  async findOne(id: number) {
    const interest = await this.prisma.interest.findUnique({
      where: { id },
    });

    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    return interest;
  }

  async update(id: number, data: Prisma.InterestUpdateInput) {
    try {
      const interest = await this.prisma.interest.update({
        where: { id },
        data,
      });
      return interest;
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotFoundException(`Interest with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Unexpected error occurred while updating the interest');
    }
  }

  async remove(id: number) {
    try {
      const interest = await this.prisma.interest.delete({
        where: { id },
      });
      return interest;
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotFoundException(`Interest with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Unexpected error occurred while deleting the interest');
    }
  }
}
