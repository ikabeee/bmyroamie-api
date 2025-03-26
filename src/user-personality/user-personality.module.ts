import { Module } from '@nestjs/common';
import { UserPersonalityService } from './user-personality.service';
import { UserPersonalityController } from './user-personality.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserPersonalityController],
  providers: [UserPersonalityService],
  imports: [PrismaModule],
})
export class UserPersonalityModule {}
