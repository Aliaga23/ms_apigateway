import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { Entrega } from './entities/entrega.entity';
import { EntregaPreguntasResponse } from './entities/entrega-preguntas-response.entity';
import { CreateEntregaInput } from './dto/create-entrega.input';
import { UpdateEntregaInput } from './dto/update-entrega.input';
import { GuardarRespuestasInput } from './dto/respuesta-input.dto';
import { CreateBulkEntregaInput } from './dto/create-bulk-entrega.input';
import { BulkAudioCreateResponse, BulkAudioListResponse } from './entities/bulk-audio-response.entity';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => Entrega)
export class EntregasResolver {
  constructor(private readonly service: EntregasService) {}

  @Mutation(() => Entrega)
  @UseGuards(GqlAuthGuard)
  createEntrega(
    @Args('createEntregaInput') input: CreateEntregaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.create(input, token);
  }

  @Query(() => [Entrega], { name: 'entregas' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser('token') token: string) {
    return this.service.findAll(token);
  }

  @Query(() => Entrega, { name: 'entrega' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.findOne(id, token);
  }

  @Mutation(() => Entrega)
  @UseGuards(GqlAuthGuard)
  updateEntrega(
    @Args('id') id: string,
    @Args('updateEntregaInput') input: UpdateEntregaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.update(id, input, token);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeEntrega(@Args('id') id: string, @CurrentUser('token') token: string) {
    return this.service.remove(id, token);
  }

  // Query pública: obtener preguntas con opciones de una entrega
  @Query(() => EntregaPreguntasResponse, { name: 'entregaPreguntas' })
  async getPreguntasConOpciones(@Args('entregaId') entregaId: string) {
    return this.service.getPreguntasConOpciones(entregaId);
  }

  // Mutation pública: guardar respuestas de una entrega
  @Mutation(() => Boolean)
  async guardarRespuestas(
    @Args('input') input: GuardarRespuestasInput,
  ) {
    await this.service.guardarRespuestas(input.entregaId, input.respuestas);
    return true;
  }

  // Mutation: generar entregas masivas para OCR (devuelve base64 del PDF)
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async createBulkOCR(
    @Args('encuestaId') encuestaId: string,
    @Args('cantidad') cantidad: number,
    @CurrentUser('token') token: string,
  ) {
    const pdfBuffer = await this.service.createBulkOCR(encuestaId, cantidad, token);
    return pdfBuffer.toString('base64');
  }

  // Mutation: generar entregas masivas para Audio
  @Mutation(() => BulkAudioCreateResponse)
  @UseGuards(GqlAuthGuard)
  async createBulkAudio(
    @Args('input') input: CreateBulkEntregaInput,
    @CurrentUser('token') token: string,
  ) {
    return this.service.createBulkAudio(input, token);
  }

  // Query: obtener todas las entregas de Audio de una encuesta
  @Query(() => BulkAudioListResponse, { name: 'bulkAudioEntregas' })
  @UseGuards(GqlAuthGuard)
  async getBulkAudioEntregas(
    @Args('encuestaId') encuestaId: string,
    @CurrentUser('token') token: string,
  ) {
    return this.service.getBulkAudioEntregas(encuestaId, token);
  }
}
