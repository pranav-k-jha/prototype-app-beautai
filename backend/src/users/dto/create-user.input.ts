import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsAlpha()
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
