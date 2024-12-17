import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsInt, IsEnum} from 'class-validator';
import { Status } from '../entities/appointments.entity';

@InputType()
export class UpdateAppointmentsInput {
  @Field(() => Int)
  @IsInt()
  appointment_id?: number;

  @Field(() => Int, {nullable:true})
  @IsInt()
  @IsOptional()
  user_id?: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  appointment_date?: Date;

  @Field(() => Status, { nullable: true })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

}
