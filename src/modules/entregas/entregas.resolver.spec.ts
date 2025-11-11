import { Test, TestingModule } from '@nestjs/testing';
import { EntregasResolver } from './entregas.resolver';

describe('EntregasResolver', () => {
  let resolver: EntregasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntregasResolver],
    }).compile();

    resolver = module.get<EntregasResolver>(EntregasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
