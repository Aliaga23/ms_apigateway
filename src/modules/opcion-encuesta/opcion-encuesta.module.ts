import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpcionEncuestaService } from './opcion-encuesta.service';
import { OpcionEncuestaResolver } from './opcion-encuesta.resolver';

@Module({
  imports: [HttpModule],
  providers: [OpcionEncuestaResolver, OpcionEncuestaService],
})
export class OpcionEncuestaModule {}
