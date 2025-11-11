import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Canal } from './entities/canal.entity';
import { CreateCanalInput, UpdateCanalInput } from './dto/canal.input';

@Injectable()
export class CanalesService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get('MS_NEST_URL') || '';
  }

  async createCanal(createCanalInput: CreateCanalInput): Promise<Canal> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.msNestUrl}/canal`, createCanalInput),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error creando canal',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllCanales(): Promise<Canal[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msNestUrl}/canal`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo canales',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCanalById(id: string): Promise<Canal> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msNestUrl}/canal/${id}`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Canal no encontrado',
        error.response?.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateCanal(id: string, updateCanalInput: UpdateCanalInput): Promise<Canal> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.msNestUrl}/canal/${id}`, updateCanalInput),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error actualizando canal',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCanal(id: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.msNestUrl}/canal/${id}`),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error eliminando canal',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
