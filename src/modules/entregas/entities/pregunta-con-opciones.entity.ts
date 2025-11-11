import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { OpcionEncuesta } from '../../opcion-encuesta/entities/opcion-encuesta.entity';

@ObjectType()
export class TipoPreguntaInfo {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;
}

@ObjectType()
export class PreguntaConOpciones {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  orden: number;

  @Field()
  texto: string;

  @Field()
  obligatorio: boolean;

  @Field(() => TipoPreguntaInfo)
  tipo: TipoPreguntaInfo;

  @Field(() => [OpcionEncuesta], { nullable: true })
  opciones?: OpcionEncuesta[];
}
