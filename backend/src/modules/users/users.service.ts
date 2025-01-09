import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { SignupUserInput } from '../auth/dto/signup-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   */
  async createUser(signupUserInput: SignupUserInput): Promise<User> {
    const { name, email, username, password } = signupUserInput;

    // Check if the username or email already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException(`Email ${email} is already in use`);
      }
      if (existingUser.username === username) {
        throw new ConflictException(`Username ${username} is already in use`);
      }
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user with the hashed password
    const newUser = this.userRepository.create({
      name,
      email,
      username,
      password: hashedPassword, // Use the hashed password here
    });
    console.log('Creating user:', {
      email,
      username,
    });

    return this.userRepository.save(newUser);
  }

  /**
   * Find a user by email or username
   */
  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    console.log('Finding user by email or username:', {
      identifier,
      identifierLength: identifier.length,
      containsAt: identifier.includes('@'),
    });

    try {
      const user = await this.userRepository.findOne({
        where: [{ email: identifier }, { username: identifier }],
        select: ['user_id', 'name', 'username', 'email', 'password'],
      });

      console.log('User found by email or username:', {
        searchIdentifier: identifier,
        found: !!user,
        userDetails: user
          ? {
              id: user.user_id,
              email: user.email,
              username: user.username,
            }
          : null,
      });
      return user;
    } catch (error) {
      console.error('Error finding user by email or username:', {
        identifier,
        errorMessage: error.message,
        errorStack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Find a user by ID
   */
  async findById(userId: number): Promise<User | null> {
    console.log('Finding user by ID:', {
      userId,
    });

    try {
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
        select: ['user_id', 'name', 'username', 'email', 'password'],
      });

      console.log('User found by ID:', {
        searchUserId: userId,
        found: !!user,
        userDetails: user
          ? {
              id: user.user_id,
              email: user.email,
              username: user.username,
            }
          : null,
      });
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', {
        userId,
        errorMessage: error.message,
        errorStack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Retrieve all users
   */
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(
    userId: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    // Find the existing user by ID
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    // If user does not exist, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Update the user's details
    const updatedUser = Object.assign(user, updateUserInput);

    // Save the updated user
    return this.userRepository.save(updatedUser);
  }

  /**
   * Remove a user by ID
   */
  async remove(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.userRepository.delete({ user_id: userId });
  }

  /**
   * Reset user password
   */
  async resetPassword(
    identifier: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.findByEmailOrUsername(identifier);

    if (!user) {
      throw new NotFoundException(
        `User with identifier ${identifier} not found`,
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await this.userRepository.save(user);
    console.log('Successfully reset password for user:', {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      password: hashedPassword,
    });

    return true;
  }
}
