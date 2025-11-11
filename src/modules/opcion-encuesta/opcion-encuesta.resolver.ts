import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OpcionEncuestaService } from './opcion-encuesta.service';
import { OpcionEncuesta } from './entities/opcion-encuesta.entity';
import { CreateOpcionEncuestaInput } from './dto/create-opcion-encuesta.input';
import { UpdateOpcionEncuestaInput } from './dto/update-opcion-encuesta.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => OpcionEncuesta)
export class OpcionEncuestaResolver {
  constructor(private readonly service: OpcionEncuestaService) {}

  @Mutation(() => OpcionEncuesta)
  @UseGuards(GqlAuthGuard)
  createOpcionEncuesta(
    @Args('createOpcionEncuestaInput') input: CreateOpcionEncuestaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.create(input, token);
  }

  @Query(() => [OpcionEncuesta], { name: 'opcionesEncuesta' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser('token') token: string) {
    return this.service.findAll(token);
  }

  @Query(() => OpcionEncuesta, { name: 'opcionEncuesta' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.findOne(id, token);
  }

  @Mutation(() => OpcionEncuesta)
  @UseGuards(GqlAuthGuard)
  updateOpcionEncuesta(
    @Args('id') id: string,
    @Args('updateOpcionEncuestaInput') input: UpdateOpcionEncuestaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.update(id, input, token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeOpcionEncuesta(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.remove(id, token);
  }
}
