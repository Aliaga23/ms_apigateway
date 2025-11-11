import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { Respuesta } from './entities/respuesta.entity';
import { CreateRespuestaInput } from './dto/create-respuesta.input';
import { UpdateRespuestaInput } from './dto/update-respuesta.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Respuesta)
export class RespuestasResolver {
  constructor(private readonly service: RespuestasService) {}

  @Mutation(() => Respuesta)
  @UseGuards(GqlAuthGuard)
  createRespuesta(
    @Args('createRespuestaInput') input: CreateRespuestaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.create(input, token);
  }

  @Query(() => [Respuesta], { name: 'respuestas' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser('token') token: string) {
    return this.service.findAll(token);
  }

  @Query(() => Respuesta, { name: 'respuesta' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.findOne(id, token);
  }

  @Mutation(() => Respuesta)
  @UseGuards(GqlAuthGuard)
  updateRespuesta(
    @Args('id') id: string,
    @Args('updateRespuestaInput') input: UpdateRespuestaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.update(id, input, token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeRespuesta(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.remove(id, token);
  }
}
