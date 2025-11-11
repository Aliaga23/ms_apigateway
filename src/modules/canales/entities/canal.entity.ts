import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Canal {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;
}
