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
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'https://encuestas.sw2ficct.lat';
  }

  // Mapear campañaId (con ñ del backend) a campanaId (sin ñ para GraphQL)
  private mapEncuesta(data: any): Encuesta {
    return {
      ...data,
      campanaId: data.campañaId || data.campanaId,
    };
  }

  // Mapear input: campanaId (sin ñ de GraphQL) → campañaId (con ñ para backend)
  private mapInputToBackend(input: any): any {
    const mapped = { ...input };
    if (mapped.campanaId !== undefined) {
      mapped.campañaId = mapped.campanaId;
      delete mapped.campanaId;
    }
    return mapped;
  }

  async createEncuesta(
    createEncuestaInput: CreateEncuestaInput,
    token: string,
  ): Promise<Encuesta> {
    const mappedInput = this.mapInputToBackend(createEncuestaInput);
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.msNestUrl}/api/encuesta`,
        mappedInput,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return this.mapEncuesta(response.data);
  }

  async findAll(token: string): Promise<Encuesta[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/encuesta`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data.map((encuesta: any) => this.mapEncuesta(encuesta));
  }

  async findOne(id: string, token: string): Promise<Encuesta> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/encuesta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return this.mapEncuesta(response.data);
  }

  async updateEncuesta(
    id: string,
    updateEncuestaInput: UpdateEncuestaInput,
    token: string,
  ): Promise<Encuesta> {
    const mappedInput = this.mapInputToBackend(updateEncuestaInput);
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.msNestUrl}/api/encuesta/${id}`,
        mappedInput,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return this.mapEncuesta(response.data);
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
