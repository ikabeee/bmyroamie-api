/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async register(userData: RegisterAuthDto) {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          telephone: '',
          about_me: '',
          status: 'ACTIVE',
          role: 'USER',
        },
      });

      const payload = {
        userId: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
      const token = this.jwt.sign(payload);

      return { payload, token };
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async login(userLogin: LoginAuthDto) {
    const { email, password } = userLogin;
    const user = await this.findUserByEmail(email);

    const doesPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordsMatch) throw new UnauthorizedException('Bad credentials');

    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = this.jwt.sign(payload);

    return { payload, token };
  }
}
