import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { Suscripcion } from './entities/suscripcion.entity';
import { CreateSuscripcionInput } from './dto/suscripcion.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Suscripcion)
export class SuscripcionesResolver {
  constructor(private readonly suscripcionesService: SuscripcionesService) {}

  @Mutation(() => Suscripcion)
  @UseGuards(GqlAuthGuard)
  createSuscripcion(
    @Args('createSuscripcionInput') createSuscripcionInput: CreateSuscripcionInput,
    @CurrentUser() user: any,
  ) {
    return this.suscripcionesService.createSuscripcion(createSuscripcionInput, user.token);
  }

  @Query(() => [Suscripcion], { name: 'suscripciones' })
  @UseGuards(GqlAuthGuard)
  getAllSuscripciones(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @CurrentUser() user: any,
  ) {
    return this.suscripcionesService.getAllSuscripciones(page, limit, user.token);
  }

  @Query(() => Suscripcion, { name: 'suscripcion' })
  @UseGuards(GqlAuthGuard)
  getSuscripcionById(@Args('id') id: string, @CurrentUser() user: any) {
    return this.suscripcionesService.getSuscripcionById(id, user.token);
  }

  @Query(() => [Suscripcion], { name: 'misSuscripciones' })
  @UseGuards(GqlAuthGuard)
  getMisSuscripciones(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @CurrentUser() user: any,
  ) {
    return this.suscripcionesService.getMisSuscripciones(page, limit, user.token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  cancelSuscripcion(@Args('id') id: string, @CurrentUser() user: any) {
    return this.suscripcionesService.cancelSuscripcion(id, user.token);
  }
}
