import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RuleService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una nueva regla
  async create(createRuleDto: CreateRuleDto) {
    try {
      const rule = await this.prisma.rule.create({
        data: createRuleDto,
      });
      return rule;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Rule already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  // Obtener todas las reglas
  async findAll() {
    try {
      return await this.prisma.rule.findMany({
        include: {
          Ad: true
        }
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  // Obtener una regla por ID
  async findOne(id: number) {
    try {
      return await this.prisma.rule.findUnique({
        where: { id },
        include: {
          Ad: true
        }
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  // Actualizar una regla por ID
  async update(id: number, updateRuleDto: UpdateRuleDto) {
    try {
      const rule = await this.prisma.rule.update({
        where: { id },
        data: updateRuleDto,
      });
      return rule;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Rule not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  // Eliminar una regla por ID
  async delete(id: number) {
    try {
      const rule = await this.prisma.rule.delete({
        where: { id },
      });
      return rule;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Rule not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  // Acción prohibida (un ejemplo de error)
  async forbiddenAction() {
    throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
  }

  private handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new HttpException('Rule already exists', HttpStatus.CONFLICT);
      }
    }
    throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
