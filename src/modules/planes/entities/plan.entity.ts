import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Plan {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field(() => Float)
  precio: number;

  @Field()
  activo: boolean;

  @Field()
  creado_en: Date;
}
