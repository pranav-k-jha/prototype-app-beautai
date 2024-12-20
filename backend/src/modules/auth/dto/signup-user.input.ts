import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';

@InputType()
export class SignupUserInput {
  @Field()
  @IsString()
  @MinLength(1, { message: 'Name must be at least 1 character long.' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}
