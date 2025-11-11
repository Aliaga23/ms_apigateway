import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Entrega } from './entities/entrega.entity';
import { CreateEntregaInput } from './dto/create-entrega.input';
import { UpdateEntregaInput } from './dto/update-entrega.input';

@Injectable()
export class EntregasService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'http://localhost:3001';
  }

  async create(input: CreateEntregaInput, token: string): Promise<Entrega> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msNestUrl}/api/entrega`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findAll(token: string): Promise<Entrega[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/entrega`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Entrega> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/entrega/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async update(id: string, input: UpdateEntregaInput, token: string): Promise<Entrega> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.msNestUrl}/api/entrega/${id}`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async remove(id: string, token: string): Promise<boolean> {
    await firstValueFrom(
      this.httpService.delete(`${this.msNestUrl}/api/entrega/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return true;
  }
}
