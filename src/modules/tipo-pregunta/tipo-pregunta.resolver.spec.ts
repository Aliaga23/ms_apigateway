import { Test, TestingModule } from '@nestjs/testing';
import { TipoPreguntaResolver } from './tipo-pregunta.resolver';

describe('TipoPreguntaResolver', () => {
  let resolver: TipoPreguntaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoPreguntaResolver],
    }).compile();

    resolver = module.get<TipoPreguntaResolver>(TipoPreguntaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
