import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from './dto/signup-user.input';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findByEmailOrUsername(identifier);
    if (!user) {
      throw new UnauthorizedException('Invalid email/username or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email/username or password.');
    }

    // Exclude the password from the returned user object
    const { password: _, ...result } = user;
    return result as User;
  }

  async login(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    console.log('Login attempt for:', loginUserInput.emailOrUsername);
    const user = await this.usersService.findByEmailOrUsername(
      loginUserInput.emailOrUsername,
    );

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid email or username');
    }

    console.log('User found, comparing passwords');
    console.log('Input password:', loginUserInput.password);
    console.log('Stored hashed password:', user.password);

    const isPasswordValid = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    console.log('Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateTokens(user);
  }
  async signup(signupUserInput: SignupUserInput): Promise<LoginResponse> {
    console.log('Signup input:', signupUserInput);
    console.log('Original password:', signupUserInput.password);

    const existingUser = await this.usersService.findByEmailOrUsername(
      signupUserInput.email,
    );

    if (existingUser) {
      throw new UnauthorizedException('Email is already in use.');
    }

    if (!signupUserInput.email) {
      throw new UnauthorizedException('Email is required for signup.');
    }

    if (!signupUserInput.password) {
      throw new UnauthorizedException('Password is required for signup.');
    }

    if (!signupUserInput.name) {
      throw new UnauthorizedException('Name is required for signup.');
    }

    if (!signupUserInput.username) {
      signupUserInput.username = signupUserInput.email;
    } else if (!signupUserInput.email) {
      signupUserInput.email = signupUserInput.username;
    }

    const user = await this.usersService.createUser(signupUserInput);
    console.log('User created:', user);
    return this.generateTokens(user);
  }

  /**
   * Resets the user's password after the new password is confirmed.
   */
  async resetPassword(
    identifier: string,
    newPassword: string,
  ): Promise<boolean> {
    return this.usersService.resetPassword(identifier, newPassword);
  }

  async refreshTokens(refreshToken: string): Promise<LoginResponse> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(user: User): LoginResponse {
    const payload = {
      sub: user.user_id,
      email: user.email,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    };
  }

  // Stores password reset tokens with expiration
  private passwordResetTokens: Map<
    string,
    { token: string; expiresAt: number }
  > = new Map();

  /**
   * Reset user's password using token
   */
  async resetPasswordUsingToken(
    identifier: string,
    newPassword: string,
  ): Promise<boolean> {
    // Find user by email or username
    const user = await this.usersService.findByEmailOrUsername(identifier);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Reset password
    return this.usersService.resetPassword(user.email, newPassword);
  }
}
