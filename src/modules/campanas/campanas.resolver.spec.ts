import { Test, TestingModule } from '@nestjs/testing';
import { CampanasResolver } from './campanas.resolver';

describe('CampanasResolver', () => {
  let resolver: CampanasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampanasResolver],
    }).compile();

    resolver = module.get<CampanasResolver>(CampanasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
