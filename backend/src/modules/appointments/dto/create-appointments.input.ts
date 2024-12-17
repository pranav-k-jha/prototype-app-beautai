import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsOptional } from "class-validator";
import { Status } from "../entities/appointments.entity";

@InputType()
export class CreateAppointmentsInput {
  @Field()
  appointment_date: Date;

  @Field(()=>Status)
  @IsEnum(Status, {message: 'Invalid status'}) // Validates that the value is one of the enum options
  @IsOptional() // Allows the default value to be used if not provided
  status: Status = Status.PENDING;

  @Field(() => Number)
  user_id: number;

}
