import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class AnomalyResult {
  @Field()
  respuesta_id: string;

  @Field()
  texto_respuesta: string;

  @Field()
  is_anomaly: boolean;

  @Field(() => Float)
  anomaly_score: number;

  @Field({ nullable: true })
  pregunta_texto?: string;
}

@ObjectType()
export class ClassificationResult {
  @Field()
  respuesta_id: string;

  @Field()
  texto_respuesta: string;

  @Field()
  categoria_predicha: string;

  @Field(() => Float)
  confianza: number;

  @Field()
  sentimiento: string;

  @Field(() => Float)
  sentimiento_score: number;

  @Field({ nullable: true })
  pregunta_texto?: string;
}

@ObjectType()
export class TextAnalysisResult {
  @Field(() => Int)
  total_respuestas: number;

  @Field(() => Int)
  anomalias_detectadas: number;

  @Field(() => [AnomalyResult])
  anomalias: AnomalyResult[];

  @Field(() => [ClassificationResult])
  ejemplos_por_categoria: ClassificationResult[];

  @Field(() => String)
  categorias_encontradas: string;

  @Field(() => String)
  sentimiento_resumen: string;

  @Field(() => String)
  sentimiento_por_categoria: string;
}
