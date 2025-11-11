import { Test, TestingModule } from '@nestjs/testing';
import { CanalesResolver } from './canales.resolver';

describe('CanalesResolver', () => {
  let resolver: CanalesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanalesResolver],
    }).compile();

    resolver = module.get<CanalesResolver>(CanalesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
