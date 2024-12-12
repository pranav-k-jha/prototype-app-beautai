import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email?: string;

  @Field()
  address?: string;
}
