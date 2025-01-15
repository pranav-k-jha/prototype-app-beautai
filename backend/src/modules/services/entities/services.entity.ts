import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Business } from '../../businesses/entities/business.entity'; // Adjust import path as needed

@ObjectType()
@Unique(['service_name'])
@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  service_id: number;

  @Column({ name: 'business_id' })
  @Field(() => Int)
  business_id: number;

  @ManyToOne(() => Business, (business) => business.services)
  @JoinColumn({ name: 'business_id' })
  @Field(() => Business)
  business: Business;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  service_name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  invasiveness: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'duration_minutes', nullable: true })
  duration?: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  concerns?: string;

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
