import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field({ nullable: true })
  address: string;
}
