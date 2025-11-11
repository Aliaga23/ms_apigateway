import { Test, TestingModule } from '@nestjs/testing';
import { OpcionEncuestaService } from './opcion-encuesta.service';

describe('OpcionEncuestaService', () => {
  let service: OpcionEncuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpcionEncuestaService],
    }).compile();

    service = module.get<OpcionEncuestaService>(OpcionEncuestaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
