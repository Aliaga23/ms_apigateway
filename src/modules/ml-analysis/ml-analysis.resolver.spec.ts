import { Test, TestingModule } from '@nestjs/testing';
import { MlAnalysisResolver } from './ml-analysis.resolver';

describe('MlAnalysisResolver', () => {
  let resolver: MlAnalysisResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MlAnalysisResolver],
    }).compile();

    resolver = module.get<MlAnalysisResolver>(MlAnalysisResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
