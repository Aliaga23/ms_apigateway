import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UsuarioAnalytics {
  @Field()
  usuario_id: string;

  @Field()
  nombre: string;

  @Field()
  email: string;

  @Field(() => Int)
  total_encuestas: number;

  @Field(() => Int)
  total_respuestas: number;
}

@ObjectType()
export class UsuariosResponse {
  @Field(() => Int)
  total_usuarios: number;

  @Field(() => [UsuarioAnalytics])
  usuarios: UsuarioAnalytics[];
}
