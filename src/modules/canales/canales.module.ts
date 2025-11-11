import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CanalesService } from './canales.service';
import { CanalesResolver } from './canales.resolver';

@Module({
  imports: [HttpModule],
  providers: [CanalesService, CanalesResolver],
})
export class CanalesModule {}
