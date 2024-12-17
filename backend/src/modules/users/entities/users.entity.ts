import { ObjectType, Field, Int, registerEnumType, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  user_id: number;

  @Column({ length: 255 })
  @Field()
  name: string;

  @Index()
  @Column({ length: 255, unique: true })
  @Field()
  email: string;

  @Column()
  password: string;
}
