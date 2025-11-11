import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { MlAnalysisService } from './ml-analysis.service';
import { KMeansResult } from './entities/kmeans-result.entity';
import { TextAnalysisResult } from './entities/text-analysis-result.entity';
import { GPTAnalysisResult } from './entities/gpt-analysis-result.entity';
import { TextResponseInput } from './dto/ml-analysis.input';

@Resolver()
export class MlAnalysisResolver {
  constructor(private readonly mlAnalysisService: MlAnalysisService) {}

  @Mutation(() => KMeansResult, { name: 'analyzeKMeans' })
  analyzeKMeans(@Args('surveyData') surveyData: string) {
    return this.mlAnalysisService.analyzeKMeans(surveyData);
  }

  @Mutation(() => GPTAnalysisResult, { name: 'analyzeCompleteWithGPT' })
  analyzeComplete(@Args('surveyData') surveyData: string) {
    return this.mlAnalysisService.analyzeComplete(surveyData);
  }

  @Mutation(() => TextAnalysisResult, { name: 'analyzeText' })
  analyzeText(@Args({ name: 'respuestas', type: () => [TextResponseInput] }) respuestas: TextResponseInput[]) {
    return this.mlAnalysisService.analyzeText(respuestas);
  }

  @Mutation(() => String, { name: 'trainTextModel' })
  trainTextModel(@Args({ name: 'respuestas', type: () => [TextResponseInput] }) respuestas: TextResponseInput[]) {
    return this.mlAnalysisService.trainTextModel(respuestas);
  }

  @Mutation(() => String, { name: 'predictText' })
  predictText(@Args('texto') texto: string) {
    return this.mlAnalysisService.predictText(texto);
  }

  @Mutation(() => String, { name: 'resetTextModel' })
  resetTextModel() {
    return this.mlAnalysisService.resetTextModel();
  }

  @Query(() => String, { name: 'textModelStatus' })
  getTextModelStatus() {
    return this.mlAnalysisService.getTextModelStatus();
  }

  @Query(() => String, { name: 'mlHealthCheck' })
  getHealth() {
    return this.mlAnalysisService.getHealth();
  }
}
