import { Module } from '@nestjs/common';
import { UserInterestService } from './user-interest.service';
import { UserInterestController } from './user-interest.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserInterestController],
  providers: [UserInterestService],
  imports: [PrismaModule],
})
export class UserInterestModule {}
