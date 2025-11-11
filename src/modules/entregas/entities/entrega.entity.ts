import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Entrega {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  enviado_en?: Date;

  @Field({ nullable: true })
  respondido_en?: Date;

  @Field()
  encuestaId: string;

  @Field()
  destinatarioId: string;

  @Field()
  creado_en: Date;

  @Field({ nullable: true })
  actualizado_en?: Date;
}
