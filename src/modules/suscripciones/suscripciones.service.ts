import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Suscripcion } from './entities/suscripcion.entity';
import { CreateSuscripcionInput, UpdateSuscripcionInput } from './dto/suscripcion.input';

@Injectable()
export class SuscripcionesService {
  private readonly msMongoUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msMongoUrl = this.configService.get('MS_MONGO_URL') || '';
  }

  async createSuscripcion(createSuscripcionInput: CreateSuscripcionInput, token: string): Promise<Suscripcion> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.msMongoUrl}/suscripciones`, createSuscripcionInput, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error creando suscripción',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllSuscripciones(page: number = 1, limit: number = 10, token: string): Promise<Suscripcion[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/suscripciones`, {
          params: { page, limit },
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo suscripciones',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSuscripcionById(id: string, token: string): Promise<Suscripcion> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/suscripciones/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Suscripción no encontrada',
        error.response?.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  async getMisSuscripciones(page: number = 1, limit: number = 10, token: string): Promise<Suscripcion[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/mis-suscripciones`, {
          params: { page, limit },
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo suscripciones',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async cancelSuscripcion(id: string, token: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.msMongoUrl}/suscripciones/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error cancelando suscripción',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
