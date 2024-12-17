import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusinessInput } from './dto/create-business.input'; 
import { UpdateBusinessInput } from './dto/update-business.input'; 

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  create(createBusinessInput: CreateBusinessInput): Promise<Business> {
    const newBusiness = this.businessRepository.create(createBusinessInput);
    return this.businessRepository.save(newBusiness);
  }

  findAll(): Promise<Business[]> {
    return this.businessRepository.find();
  }

  async findOne(provider_id: number): Promise<Business> {
    try {
      return await this.businessRepository.findOneOrFail({ where: { provider_id } });
    } catch (error) {
      throw new NotFoundException(`Business with ID ${provider_id} not found.`);
    }
  }

  async update(provider_id: number, updateBusinessInput: UpdateBusinessInput): Promise<Business> {
    const business = await this.businessRepository.findOne({ where: { provider_id } });
    
    if (!business) {
      throw new NotFoundException(`Business with ID ${provider_id} not found.`);
    }

    Object.assign(business, updateBusinessInput); 
    return this.businessRepository.save(business); 
  }

  async delete(provider_id: number): Promise<boolean> {
    const result = await this.businessRepository.delete(provider_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Business with ID ${provider_id} not found.`);
    }
    return true;
  }
}
