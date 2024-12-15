import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth-input';
import { LoginResponse } from './dto/auth-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('authInput') authInput: AuthInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('authInput') authInput: AuthInput) {
    return this.authService.signup(authInput);
  }
}
