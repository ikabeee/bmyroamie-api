import { Module } from '@nestjs/common';
import { PersonalityService } from './personality.service';
import { PersonalityController } from './personality.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PersonalityController],
  providers: [PersonalityService, PrismaService],
})
export class PersonalityModule {}
