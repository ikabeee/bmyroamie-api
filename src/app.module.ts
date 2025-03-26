import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { RuleModule } from './rule/rule.module';
import { PersonalityModule } from './personality/personality.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { InterestModule } from './interest/interest.module';
import { ImageModule } from './image/image.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AuthModule } from './auth/auth.module';
import { AmenityModule } from './amenity/amenity.module';
import { AdModule } from './ad/ad.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UserModule,
    StateModule,
    RuleModule,
    PersonalityModule,
    MunicipalityModule,
    InterestModule,
    ImageModule,
    FavoriteModule,
    AuthModule,
    AmenityModule,
    AdModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
