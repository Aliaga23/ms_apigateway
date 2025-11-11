import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlanesService } from './planes.service';
import { PlanesResolver } from './planes.resolver';

@Module({
  imports: [HttpModule],
  providers: [PlanesService, PlanesResolver],
})
export class PlanesModule {}
