import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  @UseGuards(JwtAuthGuard)
  async findOne(name: string) {
    return this.userRepository.findOne({ where: { name } });
  }
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
