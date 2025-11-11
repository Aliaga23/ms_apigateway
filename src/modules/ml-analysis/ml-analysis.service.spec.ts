import { Test, TestingModule } from '@nestjs/testing';
import { MlAnalysisService } from './ml-analysis.service';

describe('MlAnalysisService', () => {
  let service: MlAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MlAnalysisService],
    }).compile();

    service = module.get<MlAnalysisService>(MlAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
