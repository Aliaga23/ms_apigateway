import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Destinatario } from './entities/destinatario.entity';
import { CreateDestinatarioInput } from './dto/create-destinatario.input';
import { UpdateDestinatarioInput } from './dto/update-destinatario.input';

@Injectable()
export class DestinatariosService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'https://encuestas.sw2ficct.lat';
  }

  async create(input: CreateDestinatarioInput, token: string): Promise<Destinatario> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msNestUrl}/api/destinatario`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findAll(token: string): Promise<Destinatario[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/destinatario`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Destinatario> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msNestUrl}/api/destinatario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async update(id: string, input: UpdateDestinatarioInput, token: string): Promise<Destinatario> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.msNestUrl}/api/destinatario/${id}`, input, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async remove(id: string, token: string): Promise<boolean> {
    await firstValueFrom(
      this.httpService.delete(`${this.msNestUrl}/api/destinatario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return true;
  }
}
