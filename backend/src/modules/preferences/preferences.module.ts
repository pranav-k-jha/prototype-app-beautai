import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferencesService } from './preferences.service';
import { PreferencesResolver } from './preferences.resolver';
import { UserPreference } from './entities/preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPreference])],
  providers: [PreferencesResolver, PreferencesService],
  exports: [PreferencesService, TypeOrmModule],
})
export class PreferencesModule {}
