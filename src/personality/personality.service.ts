import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
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
      throw new InternalServerErrorException('Unexpected error occurred while creating the personality');
    }
  }

  async findAll() {
    return await this.prisma.personality.findMany();
  }

  async findOne(id: number) {
    const personality = await this.prisma.personality.findUnique({
      where: { id },
    });

    if (!personality) {
      throw new NotFoundException(`Personality with ID ${id} not found`);
    }

    return personality;
  }

  async update(id: number, data: Prisma.PersonalityUpdateInput) {
    try {
      const personality = await this.prisma.personality.update({
        where: { id },
        data,
      });
      return personality;
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotFoundException(`Personality with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Unexpected error occurred while updating the personality');
    }
  }

  async remove(id: number) {
    try {
      const personality = await this.prisma.personality.delete({
        where: { id },
      });
      return personality;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Personality with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Unexpected error occurred while deleting the personality');
    }
  }
}
