import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { OpcionEncuesta } from './entities/opcion-encuesta.entity';
import { CreateOpcionEncuestaInput } from './dto/create-opcion-encuesta.input';
import { UpdateOpcionEncuestaInput } from './dto/update-opcion-encuesta.input';

@Injectable()
export class OpcionEncuestaService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'http://localhost:3001';
  }

  async create(input: CreateOpcionEncuestaInput, token: string): Promise<OpcionEncuesta> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msNestUrl}/api/opcion-encuesta`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findAll(token: string): Promise<OpcionEncuesta[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/opcion-encuesta`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findOne(id: string, token: string): Promise<OpcionEncuesta> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/opcion-encuesta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async update(id: string, input: UpdateOpcionEncuestaInput, token: string): Promise<OpcionEncuesta> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.msNestUrl}/api/opcion-encuesta/${id}`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async remove(id: string, token: string): Promise<boolean> {
    await firstValueFrom(
      this.httpService.delete(`${this.msNestUrl}/api/opcion-encuesta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return true;
  }
}
