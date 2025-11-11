import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TipoPregunta {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;
}
