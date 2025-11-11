import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PreguntaConOpciones } from './pregunta-con-opciones.entity';

@ObjectType()
export class EncuestaInfo {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field({ nullable: true })
  descripcion?: string;
}

@ObjectType()
export class EntregaPreguntasResponse {
  @Field(() => ID)
  entregaId: string;

  @Field(() => EncuestaInfo)
  encuesta: EncuestaInfo;

  @Field(() => [PreguntaConOpciones])
  preguntas: PreguntaConOpciones[];
}
