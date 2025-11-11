import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class ChatbotResponse {
  @Field({ nullable: true })
  response?: string;

  @Field()
  sessionId: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  action?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  result?: any;
}
