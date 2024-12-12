import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  address?: string;
}
