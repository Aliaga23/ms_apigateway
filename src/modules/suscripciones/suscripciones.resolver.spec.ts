import { Test, TestingModule } from '@nestjs/testing';
import { SuscripcionesResolver } from './suscripciones.resolver';

describe('SuscripcionesResolver', () => {
  let resolver: SuscripcionesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuscripcionesResolver],
    }).compile();

    resolver = module.get<SuscripcionesResolver>(SuscripcionesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
