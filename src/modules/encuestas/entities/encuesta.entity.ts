import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Encuesta {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field()
  activo: boolean;

  @Field({ nullable: true })
  campanaId?: string;

  @Field({ nullable: true })
  canalId?: string;

  @Field({ nullable: true })
  creado_en?: string;
}
