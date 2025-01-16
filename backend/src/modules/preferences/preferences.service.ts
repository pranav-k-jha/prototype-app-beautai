import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserPreference } from './entities/preference.entity';
import { CreateUserPreferenceInput } from './dto/create-preference.input';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(UserPreference)
    private readonly preferencesRepository: Repository<UserPreference>,
  ) {}

  async create(
    createPreferenceInput: CreateUserPreferenceInput,
  ): Promise<UserPreference> {
    const preferenceData: DeepPartial<UserPreference> = {
      ...createPreferenceInput,
      wellness_concerns: createPreferenceInput.wellness_concerns || null,
      aesthetic_concerns: createPreferenceInput.aesthetic_concerns || null,
      aging_concerns: createPreferenceInput.aging_concerns || null,
      skin_concerns: createPreferenceInput.skin_concerns || null,
    };

    const newPreference = this.preferencesRepository.create(preferenceData);
    return this.preferencesRepository.save(newPreference);
  }

  async findByUserId(user_id: number): Promise<UserPreference | null> {
    const preference = await this.preferencesRepository.findOne({
      where: { user_id },
    });

    if (!preference) {
      return null;
    }

    // Parse JSON strings back to arrays
    return {
      ...preference,
      wellness_concerns: preference.wellness_concerns || [],
      aesthetic_concerns: preference.aesthetic_concerns || [],
      aging_concerns: preference.aging_concerns || [],
      skin_concerns: preference.skin_concerns || [],
    };
  }

  async update(
    user_id: number,
    updatePreferenceInput: Partial<CreateUserPreferenceInput>,
  ): Promise<UserPreference> {
    const existingPreference = await this.findByUserId(user_id);

    if (!existingPreference) {
      throw new NotFoundException(`Preferences for user ${user_id} not found`);
    }

    // Utility function to process array or string to JSON
    const processArrayInput = (input: unknown): string[] | null => {
      if (Array.isArray(input)) {
        return input.length > 0 ? input : null; // Return `null` for empty arrays
      }
      if (typeof input === 'string') {
        return input.split(',').map((item) => item.trim());
      }
      return null;
    };

    const updateData: DeepPartial<UserPreference> = {
      ...updatePreferenceInput,
      wellness_concerns:
        processArrayInput(updatePreferenceInput.wellness_concerns) ??
        existingPreference.wellness_concerns,
      aesthetic_concerns:
        processArrayInput(updatePreferenceInput.aesthetic_concerns) ??
        existingPreference.aesthetic_concerns,
      aging_concerns:
        processArrayInput(updatePreferenceInput.aging_concerns) ??
        existingPreference.aging_concerns,
      skin_concerns:
        processArrayInput(updatePreferenceInput.skin_concerns) ??
        existingPreference.skin_concerns,
    };

    await this.preferencesRepository.update(user_id, updateData);
    return this.findByUserId(user_id);
  }
}
