import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EncuestaAnalytics {
  @Field()
  encuesta_id: string;

  @Field()
  nombre: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  campana?: string;

  @Field({ nullable: true })
  canal?: string;

  @Field()
  activo: boolean;

  @Field(() => Int)
  total_preguntas: number;
}
