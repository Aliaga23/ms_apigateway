import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ChatbotRequestInput } from './dto/chatbot-request.input';
import { ChatbotResponse } from './entities/chatbot-response.entity';

@Injectable()
export class ChatbotService {
  private readonly msNestUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msNestUrl = this.configService.get<string>('MS_NEST_URL') || 'https://encuestas.sw2ficct.lat';
  }

  async sendMessage(input: ChatbotRequestInput, token: string): Promise<ChatbotResponse> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.msNestUrl}/api/chatbot/chat`,
        {
          mensaje: input.message,
          sessionId: input.sessionId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
    );
    return response.data;
  }

  async deleteSession(sessionId: string, token: string): Promise<ChatbotResponse> {
    const response = await firstValueFrom(
      this.httpService.delete(
        `${this.msNestUrl}/api/chatbot/session/${sessionId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
    );
    return {
      sessionId,
      message: response.data.message,
    };
  }
}
