import { Test, TestingModule } from '@nestjs/testing';
import { DestinatariosResolver } from './destinatarios.resolver';

describe('DestinatariosResolver', () => {
  let resolver: DestinatariosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinatariosResolver],
    }).compile();

    resolver = module.get<DestinatariosResolver>(DestinatariosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
