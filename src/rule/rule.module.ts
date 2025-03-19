import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RuleController],
  providers: [RuleService, PrismaService],
})
export class RuleModule {}
