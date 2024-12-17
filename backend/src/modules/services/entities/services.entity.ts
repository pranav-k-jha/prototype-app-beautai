import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('services')
@ObjectType()
export class Services {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  service_id: number;

  @Column()
  @Field()
  service_name: string;

  @Column()
  @Field()
  service_category: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  service_description?: string

  @Column({ type: 'time', nullable: true })
  @Field({ nullable: true })
  duration: string;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  @Field(() => Float)
  price: number;

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
