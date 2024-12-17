import { Test, TestingModule } from '@nestjs/testing';
import { BusinessesResolver } from './businesses.resolver';

describe('BusinessesResolver', () => {
  let resolver: BusinessesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessesResolver],
    }).compile();

    resolver = module.get<BusinessesResolver>(BusinessesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
