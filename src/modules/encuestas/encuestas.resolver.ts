import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EncuestasService } from './encuestas.service';
import { Encuesta } from './entities/encuesta.entity';
import { CreateEncuestaInput } from './dto/create-encuesta.input';
import { UpdateEncuestaInput } from './dto/update-encuesta.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Encuesta)
export class EncuestasResolver {
  constructor(private readonly encuestasService: EncuestasService) {}

  @Mutation(() => Encuesta)
  @UseGuards(GqlAuthGuard)
  createEncuesta(
    @Args('createEncuestaInput') createEncuestaInput: CreateEncuestaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.encuestasService.createEncuesta(createEncuestaInput, token);
  }

  @Query(() => [Encuesta], { name: 'encuestas' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser('token') token: string) {
    return this.encuestasService.findAll(token);
  }

  @Query(() => Encuesta, { name: 'encuesta' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.encuestasService.findOne(id, token);
  }

  @Mutation(() => Encuesta)
  @UseGuards(GqlAuthGuard)
  updateEncuesta(
    @Args('id') id: string,
    @Args('updateEncuestaInput') updateEncuestaInput: UpdateEncuestaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.encuestasService.updateEncuesta(id, updateEncuestaInput, token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeEncuesta(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.encuestasService.removeEncuesta(id, token);
  }
}
