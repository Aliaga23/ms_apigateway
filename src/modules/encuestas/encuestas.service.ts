import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaInput } from './dto/create-encuesta.input';
import { UpdateEncuestaInput } from './dto/update-encuesta.input';

@Injectable()
export class EncuestasService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'http://localhost:3001';
  }

  async createEncuesta(
    createEncuestaInput: CreateEncuestaInput,
    token: string,
  ): Promise<Encuesta> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.msNestUrl}/api/encuesta`,
        createEncuestaInput,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  async findAll(token: string): Promise<Encuesta[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/encuesta`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Encuesta> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/encuesta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async updateEncuesta(
    id: string,
    updateEncuestaInput: UpdateEncuestaInput,
    token: string,
  ): Promise<Encuesta> {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.msNestUrl}/api/encuesta/${id}`,
        updateEncuestaInput,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  async removeEncuesta(id: string, token: string): Promise<boolean> {
    await firstValueFrom(
      this.httpService.delete(`${this.msNestUrl}/api/encuesta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return true;
  }
}
