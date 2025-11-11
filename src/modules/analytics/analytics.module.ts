import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResolver } from './analytics.resolver';

@Module({
  imports: [HttpModule],
  providers: [AnalyticsService, AnalyticsResolver],
})
export class AnalyticsModule {}
