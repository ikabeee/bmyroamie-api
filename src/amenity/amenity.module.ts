import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityController } from './amenity.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AmenityController],
  providers: [AmenityService, PrismaService],
})
export class AmenityModule {}
