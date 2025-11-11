import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Pregunta {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  orden: number;

  @Field()
  texto: string;

  @Field()
  obligatorio: boolean;

  @Field()
  encuestaId: string;

  @Field()
  tipo_preguntaId: string;

  @Field()
  creado_en: Date;

  @Field({ nullable: true })
  actualizado_en?: Date;
}
