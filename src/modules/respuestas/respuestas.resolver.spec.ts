import { Test, TestingModule } from '@nestjs/testing';
import { RespuestasResolver } from './respuestas.resolver';

describe('RespuestasResolver', () => {
  let resolver: RespuestasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespuestasResolver],
    }).compile();

    resolver = module.get<RespuestasResolver>(RespuestasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
