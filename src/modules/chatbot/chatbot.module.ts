import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatbotService } from './chatbot.service';
import { ChatbotResolver } from './chatbot.resolver';

@Module({
  imports: [HttpModule],
  providers: [ChatbotService, ChatbotResolver],
})
export class ChatbotModule {}
