import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PersonalityModule } from './personality/personality.module';
import { InterestModule } from './interest/interest.module';
import { AdModule } from './ad/ad.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AuthModule,
    UserModule,
    PersonalityModule,
    InterestModule,
    AdModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
