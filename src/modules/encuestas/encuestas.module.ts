import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EncuestasService } from './encuestas.service';
import { EncuestasResolver } from './encuestas.resolver';

@Module({
  imports: [HttpModule],
  providers: [EncuestasResolver, EncuestasService],
})
export class EncuestasModule {}
