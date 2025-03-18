import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InterestController],
  providers: [InterestService, PrismaService],
})
export class InterestModule {}
