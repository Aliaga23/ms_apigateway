import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TipoPreguntaService } from './tipo-pregunta.service';
import { TipoPregunta } from './entities/tipo-pregunta.entity';
import { CreateTipoPreguntaInput, UpdateTipoPreguntaInput } from './dto/tipo-pregunta.input';

@Resolver(() => TipoPregunta)
export class TipoPreguntaResolver {
  constructor(private readonly tipoPreguntaService: TipoPreguntaService) {}

  @Mutation(() => TipoPregunta)
  createTipoPregunta(@Args('createTipoPreguntaInput') createTipoPreguntaInput: CreateTipoPreguntaInput) {
    return this.tipoPreguntaService.createTipoPregunta(createTipoPreguntaInput);
  }

  @Query(() => [TipoPregunta], { name: 'tiposPreguntas' })
  getAllTiposPreguntas() {
    return this.tipoPreguntaService.getAllTiposPreguntas();
  }

  @Query(() => TipoPregunta, { name: 'tipoPregunta' })
  getTipoPreguntaById(@Args('id') id: string) {
    return this.tipoPreguntaService.getTipoPreguntaById(id);
  }

  @Mutation(() => TipoPregunta)
  updateTipoPregunta(
    @Args('id') id: string,
    @Args('updateTipoPreguntaInput') updateTipoPreguntaInput: UpdateTipoPreguntaInput,
  ) {
    return this.tipoPreguntaService.updateTipoPregunta(id, updateTipoPreguntaInput);
  }

  @Mutation(() => Boolean)
  deleteTipoPregunta(@Args('id') id: string) {
    return this.tipoPreguntaService.deleteTipoPregunta(id);
  }
}
