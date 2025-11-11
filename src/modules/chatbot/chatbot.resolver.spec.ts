import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotResolver } from './chatbot.resolver';

describe('ChatbotResolver', () => {
  let resolver: ChatbotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatbotResolver],
    }).compile();

    resolver = module.get<ChatbotResolver>(ChatbotResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
