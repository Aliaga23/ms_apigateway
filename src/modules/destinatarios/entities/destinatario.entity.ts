import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Destinatario {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  creado_en: Date;

  @Field({ nullable: true })
  actualizado_en?: Date;
}
