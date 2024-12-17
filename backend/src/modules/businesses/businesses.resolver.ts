import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BusinessesService } from './businesses.service';
import { Business } from './entities/business.entity';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input'; 

@Resolver(() => Business)
export class BusinessesResolver {
  constructor(private readonly businessesService: BusinessesService) {}

  @Query(() => [Business], { name: 'businesses' })
  findAll(): Promise<Business[]> {
    return this.businessesService.findAll();
  }

  @Query(() => Business, { name: 'business' })
  findOne(@Args('provider_id', { type: () => Int }) provider_id: number): Promise<Business> {
    return this.businessesService.findOne(provider_id);
  }

  @Mutation(() => Business)
  createBusiness(
    @Args('createBusinessInput') createBusinessInput: CreateBusinessInput,
  ): Promise<Business> {
    return this.businessesService.create(createBusinessInput);
  }

  @Mutation(() => Business)
async updateBusiness(
  @Args('updateBusinessInput') updateBusinessInput: UpdateBusinessInput,
): Promise<Business> {
  const { provider_id, ...updateData } = updateBusinessInput;
  return this.businessesService.update(provider_id, updateData);
}


@Mutation(() => Boolean)
async deleteBusiness(
  @Args('provider_id', { type: () => Int }) provider_id: number,
): Promise<boolean> {
  return this.businessesService.delete(provider_id);
}
}
