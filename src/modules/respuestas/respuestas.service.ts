import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Respuesta } from './entities/respuesta.entity';
import { CreateRespuestaInput } from './dto/create-respuesta.input';
import { UpdateRespuestaInput } from './dto/update-respuesta.input';

@Injectable()
export class RespuestasService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'http://localhost:3001';
  }

  async create(input: CreateRespuestaInput, token: string): Promise<Respuesta> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msNestUrl}/api/respuesta`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findAll(token: string): Promise<Respuesta[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/respuesta`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Respuesta> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/respuesta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async update(id: string, input: UpdateRespuestaInput, token: string): Promise<Respuesta> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.msNestUrl}/api/respuesta/${id}`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async remove(id: string, token: string): Promise<boolean> {
    await firstValueFrom(
      this.httpService.delete(`${this.msNestUrl}/api/respuesta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return true;
  }
}
