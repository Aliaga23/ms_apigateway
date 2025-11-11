import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TipoPreguntaService } from './tipo-pregunta.service';
import { TipoPreguntaResolver } from './tipo-pregunta.resolver';

@Module({
  imports: [HttpModule],
  providers: [TipoPreguntaService, TipoPreguntaResolver],
})
export class TipoPreguntaModule {}
