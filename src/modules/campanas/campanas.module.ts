import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CampanasService } from './campanas.service';
import { CampanasResolver } from './campanas.resolver';

@Module({
  imports: [HttpModule],
  providers: [CampanasResolver, CampanasService],
})
export class CampanasModule {}
