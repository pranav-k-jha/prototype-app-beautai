import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('user_preferences')
export class UserPreference {
  @Field(() => Int)
  @PrimaryColumn('int')
  user_id: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  consent_to_camera?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  face_scan_success?: boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  selected_treatment?: string;

  @Field(() => [String], { nullable: true })
  @Column({ type: 'json', nullable: true })
  wellness_concerns?: string[];

  @Field(() => [String], { nullable: true })
  @Column({ type: 'json', nullable: true })
  aesthetic_concerns?: string[];

  @Field(() => [String], { nullable: true })
  @Column({ type: 'json', nullable: true })
  aging_concerns?: string[];

  @Field(() => [String], { nullable: true })
  @Column({ type: 'json', nullable: true })
  skin_concerns?: string[];

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  comfort_level?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  downtime_preference?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  budget_preference?: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
