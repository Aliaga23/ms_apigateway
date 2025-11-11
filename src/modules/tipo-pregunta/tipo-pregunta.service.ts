import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TipoPregunta } from './entities/tipo-pregunta.entity';
import { CreateTipoPreguntaInput, UpdateTipoPreguntaInput } from './dto/tipo-pregunta.input';

@Injectable()
export class TipoPreguntaService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get('MS_NEST_URL') || '';
  }

  async createTipoPregunta(createTipoPreguntaInput: CreateTipoPreguntaInput): Promise<TipoPregunta> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.msNestUrl}/tipo-pregunta`, createTipoPreguntaInput),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error creando tipo de pregunta',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllTiposPreguntas(): Promise<TipoPregunta[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msNestUrl}/tipo-pregunta`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo tipos de preguntas',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTipoPreguntaById(id: string): Promise<TipoPregunta> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msNestUrl}/tipo-pregunta/${id}`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Tipo de pregunta no encontrado',
        error.response?.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTipoPregunta(id: string, updateTipoPreguntaInput: UpdateTipoPreguntaInput): Promise<TipoPregunta> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.msNestUrl}/tipo-pregunta/${id}`, updateTipoPreguntaInput),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error actualizando tipo de pregunta',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTipoPregunta(id: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.msNestUrl}/tipo-pregunta/${id}`),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error eliminando tipo de pregunta',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
