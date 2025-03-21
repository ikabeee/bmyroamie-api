import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdModule } from './ad/ad.module';
import { PersonalityModule } from './personality/personality.module';
import { InterestModule } from './interest/interest.module';
import { StateModule } from './state/state.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { AmenityModule } from './amenity/amenity.module';
import { RuleModule } from './rule/rule.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), UserModule, PrismaModule, AdModule, PersonalityModule, InterestModule, StateModule, MunicipalityModule, AmenityModule, RuleModule, FavoriteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
