import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdModule } from './ad/ad.module';
import { PersonalityModule } from './personality/personality.module';
import { InterestModule } from './interest/interest.module';
import { StateModule } from './state/state.module';
import { MunicipalityModule } from './municipality/municipality.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), UserModule, PrismaModule, AdModule, PersonalityModule, InterestModule, StateModule, MunicipalityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
