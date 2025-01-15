import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateServicesInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  service_name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field(() => Int)
  @IsNumber()
  duration: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  invasiveness: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  concerns: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  business_id: number;
}
