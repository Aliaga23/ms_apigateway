import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PreguntasService } from './preguntas.service';
import { PreguntasResolver } from './preguntas.resolver';

@Module({
  imports: [HttpModule],
  providers: [PreguntasResolver, PreguntasService],
})
export class PreguntasModule {}
