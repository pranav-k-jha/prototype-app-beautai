import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email?: string;

  @Field()
  address?: string;
}
