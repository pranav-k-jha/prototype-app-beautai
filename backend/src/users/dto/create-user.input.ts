import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  address?: string;
}
