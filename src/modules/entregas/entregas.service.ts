import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Entrega } from './entities/entrega.entity';
import { EntregaPreguntasResponse } from './entities/entrega-preguntas-response.entity';
import { CreateEntregaInput } from './dto/create-entrega.input';
import { UpdateEntregaInput } from './dto/update-entrega.input';
import { BulkAudioCreateResponse, BulkAudioListResponse } from './entities/bulk-audio-response.entity';
import { CreateBulkEntregaInput } from './dto/create-bulk-entrega.input';

@Injectable()
export class EntregasService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'https://encuestas.sw2ficct.lat';
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

  // Endpoint público: obtener preguntas con opciones de una entrega
  async getPreguntasConOpciones(entregaId: string): Promise<EntregaPreguntasResponse> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/entrega/${entregaId}/preguntas`),
    );
    return response.data;
  }

  // Endpoint público: guardar respuestas de una entrega
  async guardarRespuestas(
    entregaId: string,
    respuestas: Array<{ preguntaId: string; opcionId?: string; texto?: string }>,
  ): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.msNestUrl}/api/entrega/${entregaId}/respuestas`,
        { respuestas },
      ),
    );
    return response.data;
  }

  // Generar entregas masivas para OCR con PDF
  async createBulkOCR(
    encuestaId: string,
    cantidad: number,
    token: string,
  ): Promise<Buffer> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.msNestUrl}/api/entrega/bulk-ocr`,
        { encuestaId, cantidad },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'arraybuffer',
        },
      ),
    );
    return Buffer.from(response.data);
  }

  // Generar entregas masivas para Audio
  async createBulkAudio(
    input: CreateBulkEntregaInput,
    token: string,
  ): Promise<BulkAudioCreateResponse> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.msNestUrl}/api/entrega/bulk-audio`,
        input,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  // Obtener todas las entregas de Audio de una encuesta
  async getBulkAudioEntregas(
    encuestaId: string,
    token: string,
  ): Promise<BulkAudioListResponse> {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.msNestUrl}/api/entrega/bulk-audio/${encuestaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }
}
