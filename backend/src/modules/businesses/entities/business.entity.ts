import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('businesses')
@ObjectType()
export class Business {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  provider_id: number;

  @Column()
  @Field()
  provider_name: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  rating?: number;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  total_reviews?: number;

  @Column({ type: 'time', nullable: true })
  @Field({ nullable: true })
  opening_time?: string;

  @Column({ type: 'time', nullable: true })
  @Field({ nullable: true })
  closing_time?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  distance_km?: number;

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
