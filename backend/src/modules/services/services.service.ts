import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from './entities/services.entity';
import { CreateServicesInput } from './dto/create-services.input';
import { UpdateServicesInput } from './dto/update-services.input';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
  ) {}

  create(createServicesInput: CreateServicesInput): Promise<Services> {
    const newServices = this.servicesRepository.create(createServicesInput);
    return this.servicesRepository.save(newServices);
  }

  findAll(): Promise<Services[]> {
    return this.servicesRepository.find();
  }

  async findOne(service_id: number): Promise<Services> {
    try {
      return await this.servicesRepository.findOneOrFail({ where: { service_id } });
    } catch (error) {
      throw new NotFoundException(`Service with ID ${service_id} not found.`);
    }
  }

  async update(service_id: number, updateServicesInput: UpdateServicesInput): Promise<Services> {
    const services = await this.servicesRepository.findOne({ where: { service_id } });
    
    if (!services) {
      throw new NotFoundException(`Services with ID ${service_id} not found.`);
    }

    Object.assign(services, updateServicesInput); 
    return this.servicesRepository.save(services); 
  }

  async delete(service_id: number): Promise<boolean> {
    const result = await this.servicesRepository.delete(service_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with ID ${service_id} not found.`);
    }
    return true;
  }
}
