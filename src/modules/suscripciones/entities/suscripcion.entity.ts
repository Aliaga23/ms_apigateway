import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Suscripcion {
  @Field(() => ID)
  id: string;

  @Field()
  usuario_id: string;

  @Field()
  plan_id: string;

  @Field()
  estado: string;

  @Field()
  fecha_inicio: Date;

  @Field({ nullable: true })
  fecha_fin?: Date;

  @Field()
  creado_en: Date;
}
