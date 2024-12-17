import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
  RESCHEDULED = 'Rescheduled',
  NOSHOW = 'Noshow',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'The status of an appointment',
});

@Entity('appointments')
@ObjectType()
export class Appointments {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  appointment_id: number;

  @Field((type) => User)
  user: User;

  @Column()
  @Field((type) => Int)
  user_id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointment_date?: Date;

  @Column({ type: 'enum', enum: Status })
  @Field(() => Status)
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updated_at: Date;
}
