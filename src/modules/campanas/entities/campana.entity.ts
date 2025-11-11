import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Campana {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  creado_en: Date;

  @Field({ nullable: true })
  actualizado_en?: Date;
}
