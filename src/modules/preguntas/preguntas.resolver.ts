import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { Pregunta } from './entities/pregunta.entity';
import { CreatePreguntaInput } from './dto/create-pregunta.input';
import { UpdatePreguntaInput } from './dto/update-pregunta.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Pregunta)
export class PreguntasResolver {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Mutation(() => Pregunta)
  @UseGuards(GqlAuthGuard)
  createPregunta(
    @Args('createPreguntaInput') createPreguntaInput: CreatePreguntaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.preguntasService.create(createPreguntaInput, token);
  }

  @Query(() => [Pregunta], { name: 'preguntas' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser('token') token: string) {
    return this.preguntasService.findAll(token);
  }

  @Query(() => [Pregunta], { name: 'preguntasByEncuesta' })
  @UseGuards(GqlAuthGuard)
  findByEncuesta(@Args('encuestaId') encuestaId: string, @CurrentUser('token') token: string) {
    return this.preguntasService.findByEncuesta(encuestaId, token);
  }

  @Query(() => Pregunta, { name: 'pregunta' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.preguntasService.findOne(id, token);
  }

  @Mutation(() => Pregunta)
  @UseGuards(GqlAuthGuard)
  updatePregunta(
    @Args('id') id: string,
    @Args('updatePreguntaInput') updatePreguntaInput: UpdatePreguntaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.preguntasService.update(id, updatePreguntaInput, token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removePregunta(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.preguntasService.remove(id, token);
  }
}
