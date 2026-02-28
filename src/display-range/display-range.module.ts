import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisplayRange } from './display-range.entity';
import { DisplayRangeService } from './display-range.service';
import { DisplayRangeController } from './display-range.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DisplayRange])],
  controllers: [DisplayRangeController],
  providers: [DisplayRangeService],
  exports: [DisplayRangeService],
})
export class DisplayRangeModule {}
