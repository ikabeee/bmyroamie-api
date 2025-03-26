import { Module } from '@nestjs/common';
import { AdAmenityService } from './ad-amenity.service';
import { AdAmenityController } from './ad-amenity.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AdAmenityController],
  providers: [AdAmenityService],
  imports: [PrismaModule],
})
export class AdAmenityModule {}
