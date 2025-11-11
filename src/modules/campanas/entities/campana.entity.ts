import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Campana {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field({ nullable: true })
  user_id?: string;

  @Field({ nullable: true })
  creado_en?: string;
}
