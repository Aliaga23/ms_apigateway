import { Test, TestingModule } from '@nestjs/testing';
import { OpcionEncuestaResolver } from './opcion-encuesta.resolver';

describe('OpcionEncuestaResolver', () => {
  let resolver: OpcionEncuestaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpcionEncuestaResolver],
    }).compile();

    resolver = module.get<OpcionEncuestaResolver>(OpcionEncuestaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
