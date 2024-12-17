import { Field, Float, Int, InputType } from "@nestjs/graphql";

@InputType()
export class CreateBusinessInput {
  @Field()
  provider_name: string;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field(() => Int, { nullable: true })
  total_reviews?: number;

  @Field({ nullable: true })
  opening_time?: string;

  @Field({ nullable: true })
  closing_time?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => Float, { nullable: true })
  distance_km?: number;
}
