import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CanalesService } from './canales.service';
import { Canal } from './entities/canal.entity';
import { CreateCanalInput, UpdateCanalInput } from './dto/canal.input';

@Resolver(() => Canal)
export class CanalesResolver {
  constructor(private readonly canalesService: CanalesService) {}

  @Mutation(() => Canal)
  createCanal(@Args('createCanalInput') createCanalInput: CreateCanalInput) {
    return this.canalesService.createCanal(createCanalInput);
  }

  @Query(() => [Canal], { name: 'canales' })
  getAllCanales() {
    return this.canalesService.getAllCanales();
  }

  @Query(() => Canal, { name: 'canal' })
  getCanalById(@Args('id') id: string) {
    return this.canalesService.getCanalById(id);
  }

  @Mutation(() => Canal)
  updateCanal(
    @Args('id') id: string,
    @Args('updateCanalInput') updateCanalInput: UpdateCanalInput,
  ) {
    return this.canalesService.updateCanal(id, updateCanalInput);
  }

  @Mutation(() => Boolean)
  deleteCanal(@Args('id') id: string) {
    return this.canalesService.deleteCanal(id);
  }
}
