import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class KmeansData {
  @Field(() => String)
  usuario: string;

  @Field(() => String)
  encuestas: string;

  @Field(() => String)
  categorias: string;

  @Field(() => String)
  estadisticas: string;
}
