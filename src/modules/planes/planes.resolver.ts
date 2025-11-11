import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput, UpdatePlanInput } from './dto/plan.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Plan)
export class PlanesResolver {
  constructor(private readonly planesService: PlanesService) {}

  @Mutation(() => Plan)
  @UseGuards(GqlAuthGuard)
  createPlan(
    @Args('createPlanInput') createPlanInput: CreatePlanInput,
    @CurrentUser() user: any,
  ) {
    return this.planesService.createPlan(createPlanInput, user.token);
  }

  @Query(() => [Plan], { name: 'planes' })
  getAllPlanes(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('showInactive', { type: () => Boolean, defaultValue: false }) showInactive: boolean,
  ) {
    return this.planesService.getAllPlanes(page, limit, showInactive);
  }

  @Query(() => Plan, { name: 'plan' })
  getPlanById(@Args('id') id: string) {
    return this.planesService.getPlanById(id);
  }

  @Query(() => [Plan], { name: 'planesActivos' })
  getActivePlanes(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
  ) {
    return this.planesService.getActivePlanes(page, limit);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  updatePlan(
    @Args('id') id: string,
    @Args('updatePlanInput') updatePlanInput: UpdatePlanInput,
    @CurrentUser() user: any,
  ) {
    return this.planesService.updatePlan(id, updatePlanInput, user.token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deletePlan(@Args('id') id: string, @CurrentUser() user: any) {
    return this.planesService.deletePlan(id, user.token);
  }
}
