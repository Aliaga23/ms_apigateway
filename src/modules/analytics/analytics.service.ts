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
  private readonly msPythonUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const baseUrl = this.configService.get<string>('MS_NEST_URL') || 'https://encuestas.sw2ficct.lat';
    this.msNestUrl = `${baseUrl}/api`;
    this.msPythonUrl = this.configService.get<string>('MS_PYTHON_URL') || 'https://mlearning.sw2ficct.lat';
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

    const respuestasData = response.data;

    // Llamar al servicio de ML para análisis de K-means
    let analisisKmeans: any = null;
    if (respuestasData && respuestasData.respuestas && respuestasData.respuestas.length > 0) {
      try {
        // Enviar el objeto completo al endpoint de K-means
        const mlResponse = await firstValueFrom(
          this.httpService.post(`${this.msPythonUrl}/analyze-survey-kmeans`, respuestasData)
        );
        analisisKmeans = mlResponse.data;
      } catch (mlError) {
        console.error('Error al llamar al servicio de ML K-means:', mlError);
        analisisKmeans = { error: 'No se pudo realizar el análisis de K-means' };
      }
    }

    return analisisKmeans;
  }

  async getUsuarioEncuestas(userId: string): Promise<EncuestaAnalytics[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/usuario/${userId}/encuestas`)
    );
    return response.data;
  }

  async getRespuestasCompletar(userId?: string, encuestaId?: string): Promise<any> {
    let url = `${this.msNestUrl}/analytics/respuestas-completar`;
    const params: string[] = [];
    if (userId) params.push(`userId=${userId}`);
    if (encuestaId) params.push(`encuestaId=${encuestaId}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    const response = await firstValueFrom(
      this.httpService.get(url)
    );

    const respuestas = response.data;

    // Llamar al servicio de ML para analizar las respuestas
    let analisisML: any = null;
    if (respuestas && respuestas.length > 0) {
      try {
        // Filtrar solo las respuestas que tienen texto
        const respuestasConTexto = respuestas.filter(
          (r: any) => r.texto_respuesta && r.texto_respuesta.trim().length > 0
        );

        if (respuestasConTexto.length > 0) {
          // Llamar al endpoint de análisis enviando el array completo de respuestas
          const mlResponse = await firstValueFrom(
            this.httpService.post(`${this.msPythonUrl}/analyze-text-complete`, respuestasConTexto)
          );
          analisisML = mlResponse.data;
        }
      } catch (mlError) {
        console.error('Error al llamar al servicio de ML:', mlError);
        analisisML = { error: 'No se pudo realizar el análisis de ML' };
      }
    }

    return analisisML;
  }

  async getRespuestasCompletarByCampana(campanaId: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/campana/${campanaId}/respuestas-completar`)
    );

    const respuestas = response.data;

    // Llamar al servicio de ML para analizar las respuestas
    let analisisML: any = null;
    if (respuestas && respuestas.length > 0) {
      try {
        // Filtrar solo las respuestas que tienen texto
        const respuestasConTexto = respuestas.filter(
          (r: any) => r.texto_respuesta && r.texto_respuesta.trim().length > 0
        );

        if (respuestasConTexto.length > 0) {
          // Llamar al endpoint de análisis enviando el array completo de respuestas
          const mlResponse = await firstValueFrom(
            this.httpService.post(`${this.msPythonUrl}/analyze-text-complete`, respuestasConTexto)
          );
          analisisML = mlResponse.data;
        }
      } catch (mlError) {
        console.error('Error al llamar al servicio de ML:', mlError);
        analisisML = { error: 'No se pudo realizar el análisis de ML' };
      }
    }

    return analisisML;
  }

  async getRespuestasOpcionesByCampana(campanaId: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/analytics/campana/${campanaId}/respuestas-opciones`)
    );

    const respuestasOpciones = response.data;

    // Llamar al servicio de ML para análisis de survey completo
    let analisisML: any = null;
    if (respuestasOpciones && respuestasOpciones.length > 0) {
      try {
        // Enviar el array completo al endpoint de análisis de survey
        const mlResponse = await firstValueFrom(
          this.httpService.post(`${this.msPythonUrl}/analyze-survey-complete`, respuestasOpciones)
        );
        analisisML = mlResponse.data;
      } catch (mlError) {
        console.error('Error al llamar al servicio de ML para survey complete:', mlError);
        analisisML = { error: 'No se pudo realizar el análisis de survey completo' };
      }
    }

    return analisisML;
  }
}
