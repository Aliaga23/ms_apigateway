import { Test, TestingModule } from '@nestjs/testing';
import { PreguntasResolver } from './preguntas.resolver';

describe('PreguntasResolver', () => {
  let resolver: PreguntasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreguntasResolver],
    }).compile();

    resolver = module.get<PreguntasResolver>(PreguntasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
