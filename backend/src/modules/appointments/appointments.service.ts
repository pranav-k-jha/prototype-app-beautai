import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointments, Status} from './entities/appointments.entity';
import { CreateAppointmentsInput } from './dto/create-appointments.input';
import { UpdateAppointmentsInput } from './dto/update-appointments.input';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentsRepository: Repository<Appointments>,
  ) {}

  async create(createAppointmentsInput: CreateAppointmentsInput): Promise<Appointments> {
    const { status, ...rest } = createAppointmentsInput;

    // Validate and convert user_type to enum
    const enumValue = Status[status.toUpperCase()];
    if (!enumValue) {
      throw new BadRequestException(`Invalid status: ${status}`);
    }

    const newAppointments = this.appointmentsRepository.create({
      status: enumValue,
      ...rest,
    });
    return this.appointmentsRepository.save(newAppointments);
  }

  findAll(): Promise<Appointments[]> {
    return this.appointmentsRepository.find();
  }

  async findOne(appointment_id: number): Promise<Appointments> {
    const appointments = await this.appointmentsRepository.findOne({ where: { appointment_id } });
    if (!appointments) {
      throw new NotFoundException(`Appointment with ID ${appointment_id} not found`);
    }
    return appointments;
  }

  async update(updateAppointmentsInput: UpdateAppointmentsInput): Promise<Appointments> {
    const { appointment_id, ...updateData } = updateAppointmentsInput;

    // Ensure the user exists
    const appointments = await this.findOne(appointment_id);

    // If status is being updated, validate and convert it to enum
    if (updateData.status) {
      const enumValue = Status[updateData.status.toUpperCase()];
      if (!enumValue) {
        throw new BadRequestException(
          `Invalid status type: ${updateData.status}`,
        );
      }
      updateData.status = enumValue;
    }

    Object.assign(appointments, updateData);
    return this.appointmentsRepository.save(appointments);
  }

  async remove(appointment_id: number): Promise<boolean> {
    const result = await this.appointmentsRepository.delete(appointment_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${appointment_id} not found`);
    }
    return true;
  }
}
