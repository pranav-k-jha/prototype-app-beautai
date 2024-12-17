import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsDecimal, IsInt } from 'class-validator';

@InputType()
export class UpdateBusinessInput {
  @Field(() => Int)
  @IsInt()
  provider_id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  provider_name?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsDecimal()
  rating?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  total_reviews?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  opening_time?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  closing_time?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsDecimal()
  distance_km?: number;
}
