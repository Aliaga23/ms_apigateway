import { Resolver, Query, Args } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AnalyticsService } from './analytics.service';
import { UsuariosResponse } from './entities/usuario-analytics.entity';
import { KmeansData } from './entities/kmeans-data.entity';
import { RespuestaAnalytics } from './entities/respuesta-analytics.entity';
import { EncuestaAnalytics } from './entities/encuesta-analytics.entity';
import { PreguntaEncuestaAnalytics } from './entities/pregunta-encuesta-analytics.entity';

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => PreguntaEncuestaAnalytics, { name: 'preguntaEncuesta' })
  getPreguntaEncuesta(@Args('preguntaId') preguntaId: string) {
    return this.analyticsService.getPreguntaEncuesta(preguntaId);
  }

  @Query(() => UsuariosResponse, { name: 'analyticsUsuarios' })
  getUsuarios() {
    return this.analyticsService.getUsuarios();
  }

  @Query(() => KmeansData, { name: 'userKmeansData' })
  getUserKmeansData(@Args('userId') userId: string) {
    return this.analyticsService.getUserKmeansData(userId);
  }

  @Query(() => GraphQLJSONObject, { name: 'respuestasByUsuarioEncuesta' })
  getRespuestasByUsuarioEncuesta(
    @Args('userId') userId: string,
    @Args('encuestaId') encuestaId: string
  ) {
    return this.analyticsService.getRespuestasByUsuarioEncuesta(userId, encuestaId);
  }

  @Query(() => [EncuestaAnalytics], { name: 'usuarioEncuestas' })
  getUsuarioEncuestas(@Args('userId') userId: string) {
    return this.analyticsService.getUsuarioEncuestas(userId);
  }

  @Query(() => GraphQLJSONObject, { name: 'respuestasCompletar', nullable: true })
  getRespuestasCompletar(
    @Args('userId', { nullable: true }) userId?: string,
    @Args('encuestaId', { nullable: true }) encuestaId?: string
  ) {
    return this.analyticsService.getRespuestasCompletar(userId, encuestaId);
  }

  @Query(() => GraphQLJSONObject, { name: 'respuestasCompletarByCampana', nullable: true })
  getRespuestasCompletarByCampana(@Args('campanaId') campanaId: string) {
    return this.analyticsService.getRespuestasCompletarByCampana(campanaId);
  }

  @Query(() => GraphQLJSONObject, { name: 'respuestasOpcionesByCampana', nullable: true })
  getRespuestasOpcionesByCampana(@Args('campanaId') campanaId: string) {
    return this.analyticsService.getRespuestasOpcionesByCampana(campanaId);
  }
}
