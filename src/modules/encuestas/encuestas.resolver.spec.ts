import { Test, TestingModule } from '@nestjs/testing';
import { EncuestasResolver } from './encuestas.resolver';

describe('EncuestasResolver', () => {
  let resolver: EncuestasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncuestasResolver],
    }).compile();

    resolver = module.get<EncuestasResolver>(EncuestasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
