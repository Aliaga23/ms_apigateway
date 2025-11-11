import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DestinatariosService } from './destinatarios.service';
import { Destinatario } from './entities/destinatario.entity';
import { CreateDestinatarioInput } from './dto/create-destinatario.input';
import { UpdateDestinatarioInput } from './dto/update-destinatario.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Destinatario)
export class DestinatariosResolver {
  constructor(private readonly service: DestinatariosService) {}

  @Mutation(() => Destinatario)
  @UseGuards(GqlAuthGuard)
  createDestinatario(
    @Args('createDestinatarioInput') input: CreateDestinatarioInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.create(input, token);
  }

  @Query(() => [Destinatario], { name: 'destinatarios' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser('token') token: string) {
    return this.service.findAll(token);
  }

  @Query(() => Destinatario, { name: 'destinatario' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.findOne(id, token);
  }

  @Mutation(() => Destinatario)
  @UseGuards(GqlAuthGuard)
  updateDestinatario(
    @Args('id') id: string,
    @Args('updateDestinatarioInput') input: UpdateDestinatarioInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.update(id, input, token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeDestinatario(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.remove(id, token);
  }
}
