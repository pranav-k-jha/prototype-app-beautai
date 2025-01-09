import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { SignupUserInput } from './dto/signup-user.input';
import { LoginResponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Mutation to handle user login
   */
  @Mutation(() => LoginResponse)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginResponse> {
    return this.authService.login(loginUserInput);
  }

  /**
   * Mutation to handle user signup
   */
  @Mutation(() => LoginResponse)
  async signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput,
  ): Promise<LoginResponse> {
    return this.authService.signup(signupUserInput);
  }

  /**
   * Mutation to refresh authentication tokens
   */
  @Mutation(() => LoginResponse)
  async refreshTokens(
    @Args('refreshToken') refreshToken: string,
  ): Promise<LoginResponse> {
    return this.authService.refreshTokens(refreshToken);
  }

  /**
   * Mutation to reset password using token
   */
  @Mutation(() => Boolean)
  async resetPassword(
    @Args('identifier', { type: () => String }) identifier: string,
    @Args('newPassword', { type: () => String }) newPassword: string,
  ): Promise<boolean> {
    return this.authService.resetPasswordUsingToken(identifier, newPassword);
  }
}
