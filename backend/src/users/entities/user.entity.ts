import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  user_id: number;

  @Column({ length: 255 })
  @Field()
  name: string;

  @Column({ length: 255, unique: true })
  @Field()
  email: string;

  @Column({ length: 255, nullable: true })
  @Field({ nullable: true })
  address?: string;
}
