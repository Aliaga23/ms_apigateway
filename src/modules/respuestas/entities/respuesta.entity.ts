import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Respuesta {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  texto?: string;

  @Field(() => Int, { nullable: true })
  numero?: number;

  @Field()
  recibido_en: Date;

  @Field()
  entregaId: string;

  @Field()
  preguntaId: string;

  @Field({ nullable: true })
  opcionEncuestaId?: string;

  @Field()
  creado_en: Date;

  @Field({ nullable: true })
  actualizado_en?: Date;
}
