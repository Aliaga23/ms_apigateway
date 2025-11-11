import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Usuario {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  email: string;

  @Field()
  telefono: string;

  @Field()
  estado: boolean;

  @Field()
  es_admin: boolean;

  @Field()
  creado_en: Date;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => Usuario)
  usuario: Usuario;
}
