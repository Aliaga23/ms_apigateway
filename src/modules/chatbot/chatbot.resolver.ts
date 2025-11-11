import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotRequestInput } from './dto/chatbot-request.input';
import { ChatbotResponse } from './entities/chatbot-response.entity';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ChatbotResolver {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Mutation(() => ChatbotResponse)
  sendChatbotMessage(
    @Args('input') input: ChatbotRequestInput,
    @CurrentUser('token') token: string
  ) {
    return this.chatbotService.sendMessage(input, token);
  }

  @Mutation(() => ChatbotResponse)
  deleteChatbotSession(
    @Args('sessionId') sessionId: string,
    @CurrentUser('token') token: string
  ) {
    return this.chatbotService.deleteSession(sessionId, token);
  }
}
