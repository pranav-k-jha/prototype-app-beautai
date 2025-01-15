import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesResolver } from './preferences.resolver';
import { PreferencesService } from './preferences.service';

describe('PreferencesResolver', () => {
  let resolver: PreferencesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferencesResolver, PreferencesService],
    }).compile();

    resolver = module.get<PreferencesResolver>(PreferencesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
