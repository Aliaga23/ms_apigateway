import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PreguntaEncuestaAnalytics {
  @Field(() => String)
  encuesta: string;
}
