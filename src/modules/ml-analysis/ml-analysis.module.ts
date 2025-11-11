import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MlAnalysisService } from './ml-analysis.service';
import { MlAnalysisResolver } from './ml-analysis.resolver';

@Module({
  imports: [HttpModule],
  providers: [MlAnalysisService, MlAnalysisResolver],
})
export class MlAnalysisModule {}
