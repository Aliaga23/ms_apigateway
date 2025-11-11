import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EntregaResumen {
  @Field()
  id: string;

  @Field()
  enviado_en: string;
}

@ObjectType()
export class BulkAudioCreateResponse {
  @Field()
  message: string;

  @Field(() => Int)
  cantidad: number;

  @Field()
  encuestaId: string;

  @Field(() => [EntregaResumen])
  entregas: EntregaResumen[];
}

@ObjectType()
export class EncuestaInfoAudio {
  @Field()
  id: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;
}

@ObjectType()
export class EntregaDetalle {
  @Field()
  id: string;

  @Field()
  enviado_en: string;

  @Field({ nullable: true })
  respondido_en?: string;

  @Field()
  estado: string;

  @Field(() => Int)
  totalRespuestas: number;
}

@ObjectType()
export class BulkAudioListResponse {
  @Field(() => EncuestaInfoAudio)
  encuesta: EncuestaInfoAudio;

  @Field(() => Int)
  totalEntregas: number;

  @Field(() => Int)
  entregasRespondidas: number;

  @Field(() => Int)
  entregasPendientes: number;

  @Field(() => [EntregaDetalle])
  entregas: EntregaDetalle[];
}
