import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { UserService } from 'src/user/user.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }
  async login(userLogin: LoginAuthDto): Promise<PayloadAuthDto> {
    try {
      const { email, password } = userLogin;
      const user = await this.findUserByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error', error);
    }
  }
  async register(userRegister: RegisterAuthDto): Promise<User> {
    try {
      const { password } = userRegister;
      const hashPassword = await bcrypt.hash(password, 10);
      userRegister = { ...userRegister, password: hashPassword };
      const user = await this.prisma.user.create({
        data: {
          ...userRegister,
          telephone: '',
          about_me: '',
          status: 1,
          role: 1,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error', error);
    }
  }
}
