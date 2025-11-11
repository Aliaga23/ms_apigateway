import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DestinatariosService } from './destinatarios.service';
import { DestinatariosResolver } from './destinatarios.resolver';

@Module({
  imports: [HttpModule],
  providers: [DestinatariosResolver, DestinatariosService],
})
export class DestinatariosModule {}
