import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    console.log(this.createUser);
    return this.userRepository.save(newUser);
  }

  async findOne(name: string) {
    return this.userRepository.findOne({ where: { name } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
