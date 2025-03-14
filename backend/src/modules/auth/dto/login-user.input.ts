import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsString()
  emailOrUsername: string;

  @Field()
  @IsString()
  password: string;
}
