import { Test, TestingModule } from '@nestjs/testing';
import { CanalesService } from './canales.service';

describe('CanalesService', () => {
  let service: CanalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanalesService],
    }).compile();

    service = module.get<CanalesService>(CanalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
