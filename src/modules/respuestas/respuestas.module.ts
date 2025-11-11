import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RespuestasService } from './respuestas.service';
import { RespuestasResolver } from './respuestas.resolver';

@Module({
  imports: [HttpModule],
  providers: [RespuestasResolver, RespuestasService],
})
export class RespuestasModule {}
