import { CreateUserPreferenceInput } from './create-preference.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePreferenceInput extends PartialType(
  CreateUserPreferenceInput,
) {
  // No additional fields needed since we're using PartialType
}
