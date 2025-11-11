import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ChatbotRequestInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  message: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
