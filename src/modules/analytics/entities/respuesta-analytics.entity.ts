import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RespuestaAnalytics {
  @Field()
  respuesta_id: string;

  @Field({ nullable: true })
  texto_respuesta?: string;

  @Field()
  pregunta_texto: string;

  @Field()
  encuesta_id: string;

  @Field()
  encuesta_nombre: string;

  @Field()
  campana: string;

  @Field()
  canal: string;

  @Field()
  entrega_id: string;
}
