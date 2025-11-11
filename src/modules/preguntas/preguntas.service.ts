import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Pregunta } from './entities/pregunta.entity';
import { CreatePreguntaInput } from './dto/create-pregunta.input';
import { UpdatePreguntaInput } from './dto/update-pregunta.input';

@Injectable()
export class PreguntasService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'http://localhost:3001';
  }

  async create(createPreguntaInput: CreatePreguntaInput, token: string): Promise<Pregunta> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msNestUrl}/api/pregunta`, createPreguntaInput, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findAll(token: string): Promise<Pregunta[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/pregunta`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Pregunta> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/pregunta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findByEncuesta(encuestaId: string, token: string): Promise<Pregunta[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/pregunta/encuesta/${encuestaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async update(id: string, updatePreguntaInput: UpdatePreguntaInput, token: string): Promise<Pregunta> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.msNestUrl}/api/pregunta/${id}`, updatePreguntaInput, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async remove(id: string, token: string): Promise<boolean> {
    await firstValueFrom(
      this.httpService.delete(`${this.msNestUrl}/api/pregunta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return true;
  }
}
