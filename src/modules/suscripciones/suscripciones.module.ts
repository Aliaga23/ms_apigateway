import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesResolver } from './suscripciones.resolver';

@Module({
  imports: [HttpModule],
  providers: [SuscripcionesService, SuscripcionesResolver],
})
export class SuscripcionesModule {}
