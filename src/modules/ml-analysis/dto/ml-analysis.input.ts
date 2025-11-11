import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SurveyDataInput {
  @Field(() => String)
  data: string; // JSON string de los datos de encuesta
}

@InputType()
export class TextResponseInput {
  @Field()
  respuesta_id: string;

  @Field()
  texto_respuesta: string;

  @Field({ nullable: true })
  pregunta_texto?: string;
}
