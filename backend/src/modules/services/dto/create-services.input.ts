import { Field, Float, InputType } from "@nestjs/graphql";
import { Matches } from "class-validator";

@InputType()
export class CreateServicesInput {
  @Field()
  service_name: string;

  @Field()
  service_category: string;

  @Field({ nullable: true })
  service_description?: string;

  @Field(() => String) // Representing TIME as a string
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Duration must be in the format HH:MM:SS',
  })
  duration: string;

  @Field(() => Float)
  price: number;

}
