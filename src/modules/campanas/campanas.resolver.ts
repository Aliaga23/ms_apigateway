import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { Campana } from './entities/campana.entity';
import { CreateCampanaInput } from './dto/create-campana.input';
import { UpdateCampanaInput } from './dto/update-campana.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Campana)
export class CampanasResolver {
  constructor(private readonly service: CampanasService) {}

  @Mutation(() => Campana)
  @UseGuards(GqlAuthGuard)
  createCampana(
    @Args('createCampanaInput') input: CreateCampanaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.create(input, token);
  }

  @Query(() => [Campana], { name: 'campanas' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser('token') token: string) {
    return this.service.findAll(token);
  }

  @Query(() => Campana, { name: 'campana' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.findOne(id, token);
  }

  @Mutation(() => Campana)
  @UseGuards(GqlAuthGuard)
  updateCampana(
    @Args('id') id: string,
    @Args('updateCampanaInput') input: UpdateCampanaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.update(id, input, token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeCampana(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.remove(id, token);
  }
}
