import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('name', { type: () => String }) name: string): Promise<User> {
    return this.usersService.findOneByUsername(name);
  }

  // @Mutation(() => User)
  // updateUser(
  //   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  // ): Promise<User> {
  //   return this.usersService.update(updateUserInput);
  // }

  // @Mutation(() => Boolean)
  // removeUser(
  //   @Args('user_id', { type: () => Int }) user_id: number,
  // ): Promise<boolean> {
  //   return this.usersService.remove(user_id);
  // }
}
