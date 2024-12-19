import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserInput } from './dto/create-user.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { SignupUserInput } from '../auth/dto/signup-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // async createUser(createUserInput: CreateUserInput): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
  //   const newUser = this.userRepository.create({
  //     ...createUserInput,
  //     password: hashedPassword,
  //   });
  //   console.log('Saving user with hashed password:', newUser);
  //   return this.userRepository.save(newUser);
  // }

  async createUser(signupUserInput: SignupUserInput): Promise<User> {
    const newUser = this.userRepository.create(signupUserInput);
    console.log('Saving user with hashed password:', newUser);
    return this.userRepository.save(newUser);
  }

  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  @UseGuards(JwtAuthGuard)
  async findOneByUsername(name: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { name },
    });
    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }
    console.log('Retrieved user:', user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    console.log('Retrieved user:', user);
    return user;
  }

  // async update(updateUserInput: UpdateUserInput): Promise<User> {
  //   const { user_id, ...updateData } = updateUserInput;

  //   // Ensure the user exists
  //   const user = await this.findOne(user_id);

  //   // If user_type is being updated, validate and convert it to enum
  //   if (updateData.user_type) {
  //     const enumValue = UserType[updateData.user_type.toUpperCase()];
  //     if (!enumValue) {
  //       throw new BadRequestException(
  //         `Invalid user type: ${updateData.user_type}`,
  //       );
  //     }
  //     updateData.user_type = enumValue;
  //   }

  //   Object.assign(user, updateData);
  //   return this.userRepository.save(user);
  // }

  // async remove(user_id: number): Promise<boolean> {
  //   const result = await this.userRepository.delete(user_id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`User with ID ${user_id} not found`);
  //   }
  //   return true;
  // }
}
