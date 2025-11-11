import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { UsuariosResponse } from './entities/usuario-analytics.entity';
import { KmeansData } from './entities/kmeans-data.entity';
import { RespuestaAnalytics } from './entities/respuesta-analytics.entity';
import { EncuestaAnalytics } from './entities/encuesta-analytics.entity';
import { PreguntaEncuestaAnalytics } from './entities/pregunta-encuesta-analytics.entity';

@Injectable()
export class AnalyticsService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'https://encuestas.sw2ficct.lat/api';
  }

  async getPreguntaEncuesta(preguntaId: string): Promise<PreguntaEncuestaAnalytics> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/pregunta/${preguntaId}/encuesta`)
    );
    return response.data;
  }

  async getUsuarios(): Promise<UsuariosResponse> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/usuarios`)
    );
    return response.data;
  }

  async getUserKmeansData(userId: string): Promise<KmeansData> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/usuario/${userId}/kmeans-data`)
    );
    return response.data;
  }

  async getRespuestasByUsuarioEncuesta(userId: string, encuestaId: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/respuestas/${userId}/${encuestaId}`)
    );
    return response.data;
  }

  async getUsuarioEncuestas(userId: string): Promise<EncuestaAnalytics[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/usuario/${userId}/encuestas`)
    );
    return response.data;
  }

  async getRespuestasCompletar(userId?: string, encuestaId?: string): Promise<RespuestaAnalytics[]> {
    let url = `${this.msNestUrl}/analytics/respuestas-completar`;
    const params: string[] = [];
    if (userId) params.push(`userId=${userId}`);
    if (encuestaId) params.push(`encuestaId=${encuestaId}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    const response = await firstValueFrom(
      this.httpService.get(url)
    );
    return response.data;
  }

  async getRespuestasCompletarByCampana(campanaId: string): Promise<RespuestaAnalytics[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/campana/${campanaId}/respuestas-completar`)
    );
    return response.data;
  }

  async getRespuestasOpcionesByCampana(campanaId: string): Promise<any[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/campana/${campanaId}/respuestas-opciones`)
    );
    return response.data;
  }
}
