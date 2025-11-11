import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OpcionEncuesta {
  @Field(() => ID)
  id: string;

  @Field()
  texto: string;

  @Field({ nullable: true })
  valor?: string;

  @Field({ nullable: true })
  preguntaId?: string;
}
