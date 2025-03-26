import { Module } from '@nestjs/common';
import { UserInterestService } from './user-interest.service';
import { UserInterestController } from './user-interest.controller';

@Module({
  controllers: [UserInterestController],
  providers: [UserInterestService],
})
export class UserInterestModule {}
