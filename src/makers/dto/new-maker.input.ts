import { IsOptional, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class NewMakerInput {
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
