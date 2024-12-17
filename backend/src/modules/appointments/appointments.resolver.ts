import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointments} from './entities/appointments.entity';
import { CreateAppointmentsInput } from '../appointments/dto/create-appointments.input';
import { UpdateAppointmentsInput } from './dto/update-appointments.input'; 

@Resolver(() => Appointments)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Query(() => [Appointments], { name: 'appointments' })
  findAll(): Promise<Appointments[]> {
    return this.appointmentsService.findAll();
  }

  @Query(() => Appointments, { name: 'appointments' })
  findOne(@Args('appointment_id', { type: () => Int }) appointment_id: number): Promise<Appointments> {
    return this.appointmentsService.findOne(appointment_id);
  }

  @Mutation(() => Appointments)
  createAppointments(
    @Args('createAppointmentsInput') createAppointmentsInput: CreateAppointmentsInput,
  ): Promise<Appointments> {
    return this.appointmentsService.create(createAppointmentsInput);
  }

  @Mutation(() => Appointments)
  updateAppointments(@Args('updateAppointmentsInput') updateAppointmentsInput: UpdateAppointmentsInput): Promise<Appointments> {
    return this.appointmentsService.update(updateAppointmentsInput);
  }

  @Mutation(() => Boolean)
  removeAppointments(@Args('appointment_id', { type: () => Int }) appointment_id: number): Promise<boolean> {
    return this.appointmentsService.remove(appointment_id);

}
}
