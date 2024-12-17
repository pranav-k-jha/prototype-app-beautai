import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsDecimal, IsInt, Matches} from 'class-validator';

@InputType()
export class UpdateServicesInput {
  @Field(() => Int)
  @IsInt()
  service_id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  service_name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  service_category?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  service_description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Duration must be in the format HH:MM:SS',
  })
  duration?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsDecimal()
  price?: number;

}
