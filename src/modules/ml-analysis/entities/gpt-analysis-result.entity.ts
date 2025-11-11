import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GPTAnalysisResult {
  @Field(() => String)
  clustering: string;

  @Field(() => String, { nullable: true })
  gpt_analysis?: string;

  @Field({ nullable: true })
  gpt_error?: string;

  @Field({ nullable: true })
  note?: string;
}
