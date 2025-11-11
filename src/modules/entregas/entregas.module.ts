import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EntregasService } from './entregas.service';
import { EntregasResolver } from './entregas.resolver';

@Module({
  imports: [HttpModule],
  providers: [EntregasResolver, EntregasService],
})
export class EntregasModule {}
