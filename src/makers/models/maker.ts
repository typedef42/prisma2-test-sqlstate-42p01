import { IsOptional, Min } from 'class-validator';
import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Maker {
  @Field(type => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field(type => Int)
  @Min(0)
  followers: number;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;
}
