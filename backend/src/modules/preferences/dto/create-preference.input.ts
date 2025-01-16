import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsInt } from 'class-validator';

@InputType()
export class CreateUserPreferenceInput {
  @Field(() => Int)
  @IsInt()
  user_id: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  consent_to_camera?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  face_scan_success?: boolean;

  @Field(() => String, { nullable: true })
  selected_treatment?: string;

  @Field(() => [String], { nullable: true })
  wellness_concerns?: string[];

  @Field(() => [String], { nullable: true })
  aesthetic_concerns?: string[];

  @Field(() => [String], { nullable: true })
  aging_concerns?: string[];

  @Field(() => [String], { nullable: true })
  skin_concerns?: string[];

  @Field(() => String, { nullable: true })
  comfort_level?: string;

  @Field(() => String, { nullable: true })
  downtime_preference?: string;

  @Field(() => String, { nullable: true })
  budget_preference?: string;
}
