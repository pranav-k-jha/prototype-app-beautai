import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Exclude } from 'class-transformer';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  user_id: number;

  @Column({ length: 255, unique: true })
  @Field()
  name: string;

  @Column({ length: 255, unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ length: 255, nullable: true })
  @Field({ nullable: true })
  address?: string;
}
