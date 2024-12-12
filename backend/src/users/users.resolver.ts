import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Query((returns) => [User])
  // @UseGuards(JwtAuthGuard)
  // users(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('name') name: string) {
    return this.usersService.findOne(name);
  }

  // @Mutation((returns) => User)
  // createUser(
  //   @Args('createUserInput') createUserInput: CreateUserInput,
  // ): Promise<User> {
  //   return this.usersService.createUser(createUserInput);
  // }
}
