import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OpcionEncuesta {
  @Field(() => ID)
  id: string;

  @Field()
  texto: string;

  @Field({ nullable: true })
  valor?: string;

  @Field()
  preguntaId: string;

  @Field()
  creado_en: Date;

  @Field({ nullable: true })
  actualizado_en?: Date;
}
