import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './entities/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  providers: [ServicesResolver, ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
