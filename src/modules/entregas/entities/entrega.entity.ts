import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Entrega {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  enviado_en?: string;

  @Field({ nullable: true })
  respondido_en?: string;

  @Field()
  encuestaId: string;

  @Field()
  destinatarioId: string;
}
