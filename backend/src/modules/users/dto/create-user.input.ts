import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
