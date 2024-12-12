import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(name);

    const valid = await bcrypt.compare(password, user?.password);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.user_id,
      }),
      user,
    };
  }
  async signup(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.name);

    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this.usersService.createUser({
      ...loginUserInput,
    });
  }
}
