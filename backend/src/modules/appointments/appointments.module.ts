import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './entities/appointments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointments])],
  providers: [AppointmentsResolver, AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
