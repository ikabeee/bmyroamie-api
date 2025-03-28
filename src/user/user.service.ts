import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({ data: createUserDto });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        include: {
          UserPersonality: {
            include: {
              Personality: true
            }
          },
          UserInterest: {
            include: {
              Interest: true
            }
          },
          Ad: true,
          Favorite: {
            include: {
              Ad: true
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
      return await this.prisma.user.findUnique({
        where: { id },
        include: {
          UserPersonality: {
            include: {
              Personality: true
            }
          },
          UserInterest: {
            include: {
              Interest: true
            }
          },
          Ad: true,
          Favorite: {
            include: {
              Ad: true
            }
          }
        }
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  private handlePrismaError(error: unknown) {
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
