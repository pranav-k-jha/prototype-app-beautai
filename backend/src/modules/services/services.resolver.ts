import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService} from './services.service';
import { Services } from './entities/services.entity';
import { CreateServicesInput } from './dto/create-services.input';
import { UpdateServicesInput } from './dto/update-services.input';

@Resolver(() => Services)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Query(() => [Services], { name: 'services' })
  findAllService(): Promise<Services[]> {
    return this.servicesService.findAll();
  }

  @Query(() => Services, { name: 'services' })
  GetServiceById(@Args('service_id', { type: () => Int }) service_id: number): Promise<Services> {
    return this.servicesService.findOne(service_id);
  }

  @Mutation(() => Services)
  createServices(
    @Args('createServicesInput') createServicesInput: CreateServicesInput,
  ): Promise<Services> {
    return this.servicesService.create(createServicesInput);
  }

  @Mutation(() => Services)
async updateServices(
  @Args('updateServicesInput') updateServicesInput: UpdateServicesInput,
): Promise<Services> {
  const { service_id, ...updateData } = updateServicesInput;
  return this.servicesService.update(service_id, updateData);
}


@Mutation(() => Boolean)
async deleteServices(
  @Args('service_id', { type: () => Int }) service_id: number,
): Promise<boolean> {
  return this.servicesService.delete(service_id);
}
}
