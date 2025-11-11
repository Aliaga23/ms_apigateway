import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario, LoginResponse } from './entities/usuario.entity';
import { CreateUsuarioInput, LoginInput, UpdateUsuarioInput } from './dto/usuario.input';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Mutation(() => Usuario)
  register(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
    return this.usuariosService.register(createUsuarioInput);
  }

  @Mutation(() => LoginResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.usuariosService.login(loginInput);
  }

  @Query(() => Usuario, { name: 'perfil' })
  @UseGuards(GqlAuthGuard)
  getProfile(@CurrentUser() user: any) {
    return this.usuariosService.getProfile(user.token);
  }

  @Query(() => [Usuario], { name: 'usuarios' })
  getAllUsers(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
  ) {
    return this.usuariosService.getAllUsers(page, limit);
  }

  @Query(() => Usuario, { name: 'usuario' })
  getUserById(@Args('id') id: string) {
    return this.usuariosService.getUserById(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  updateUsuario(
    @Args('id') id: string,
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser() user: any,
  ) {
    return this.usuariosService.updateUser(id, updateUsuarioInput, user.token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteUsuario(@Args('id') id: string, @CurrentUser() user: any) {
    return this.usuariosService.deleteUser(id, user.token);
  }
}
