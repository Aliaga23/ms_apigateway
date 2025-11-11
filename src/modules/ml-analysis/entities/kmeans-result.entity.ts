import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ClusterAnalysis {
  @Field(() => Int)
  id: number;

  @Field()
  nombre_ejecutivo: string;

  @Field(() => Int)
  tamano: number;

  @Field(() => Float)
  promedio_general: number;

  @Field()
  interpretacion: string;
}

@ObjectType()
export class KMeansResult {
  @Field(() => Int)
  n_clusters: number;

  @Field(() => Float)
  silhouette_score: number;

  @Field(() => [ClusterAnalysis])
  cluster_analysis: ClusterAnalysis[];

  @Field()
  categoria_encuesta: string;
}
