import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PreferencesService } from './preferences.service';
import { UserPreference } from './entities/preference.entity';
import { CreateUserPreferenceInput } from './dto/create-preference.input';
import { UpdatePreferenceInput } from './dto/update-preference.input';

@Resolver(() => UserPreference)
export class PreferencesResolver {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Mutation(() => UserPreference)
  async createUserPreference(
    @Args('createUserPreferenceInput')
    createUserPreferenceInput: CreateUserPreferenceInput,
  ): Promise<UserPreference> {
    return this.preferencesService.create(createUserPreferenceInput);
  }

  @Query(() => UserPreference, { nullable: true })
  async getUserPreference(
    @Args('user_id') user_id: number,
  ): Promise<UserPreference | null> {
    return this.preferencesService.findByUserId(user_id);
  }

  @Mutation(() => UserPreference)
  async updateUserPreference(
    @Args('user_id') user_id: number,
    @Args('updateUserPreferenceInput')
    updateUserPreferenceInput: UpdatePreferenceInput,
  ): Promise<UserPreference> {
    return this.preferencesService.update(user_id, updateUserPreferenceInput);
  }
}
