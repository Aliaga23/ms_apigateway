import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput, UpdatePlanInput } from './dto/plan.input';

@Injectable()
export class PlanesService {
  private readonly msMongoUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msMongoUrl = this.configService.get('MS_MONGO_URL') || '';
  }

  async createPlan(createPlanInput: CreatePlanInput, token: string): Promise<Plan> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.msMongoUrl}/planes`, createPlanInput, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error creando plan',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPlanes(page: number = 1, limit: number = 10, showInactive: boolean = false): Promise<Plan[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/planes`, {
          params: { page, limit, show_inactive: showInactive },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo planes',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPlanById(id: string): Promise<Plan> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/planes/${id}`),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Plan no encontrado',
        error.response?.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  async updatePlan(id: string, updatePlanInput: UpdatePlanInput, token: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.put(`${this.msMongoUrl}/planes/${id}`, updatePlanInput, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error actualizando plan',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePlan(id: string, token: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.msMongoUrl}/planes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error eliminando plan',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActivePlanes(page: number = 1, limit: number = 10): Promise<Plan[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/planes/activos`, {
          params: { page, limit },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo planes activos',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
