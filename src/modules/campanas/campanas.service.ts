import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Campana } from './entities/campana.entity';
import { CreateCampanaInput } from './dto/create-campana.input';
import { UpdateCampanaInput } from './dto/update-campana.input';

@Injectable()
export class CampanasService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'http://localhost:3001';
  }

  async create(input: CreateCampanaInput, token: string): Promise<Campana> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msNestUrl}/api/campana`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findAll(token: string): Promise<Campana[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/campana`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Campana> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/campana/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async update(id: string, input: UpdateCampanaInput, token: string): Promise<Campana> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.msNestUrl}/api/campana/${id}`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async remove(id: string, token: string): Promise<boolean> {
    await firstValueFrom(
      this.httpService.delete(`${this.msNestUrl}/api/campana/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return true;
  }
}
