import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { KMeansResult } from './entities/kmeans-result.entity';
import { TextAnalysisResult } from './entities/text-analysis-result.entity';
import { GPTAnalysisResult } from './entities/gpt-analysis-result.entity';
import { TextResponseInput } from './dto/ml-analysis.input';

@Injectable()
export class MlAnalysisService {
  private readonly msPythonUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msPythonUrl = this.configService.get<string>('MS_PYTHON_URL') || 'https://python.sw2ficct.lat';
  }

  // K-Means Analysis
  async analyzeKMeans(surveyData: string): Promise<KMeansResult> {
    const data = JSON.parse(surveyData);
    const response = await firstValueFrom(
      this.httpService.post(`${this.msPythonUrl}/analyze-survey-kmeans`, data)
    );
    return response.data;
  }

  async analyzeComplete(surveyData: string): Promise<GPTAnalysisResult> {
    const data = JSON.parse(surveyData);
    const response = await firstValueFrom(
      this.httpService.post(`${this.msPythonUrl}/analyze-survey-complete`, data)
    );
    return response.data;
  }

  // Text Analysis
  async analyzeText(respuestas: TextResponseInput[]): Promise<TextAnalysisResult> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msPythonUrl}/analyze-text-complete`, respuestas)
    );
    return response.data;
  }

  async trainTextModel(respuestas: TextResponseInput[]): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msPythonUrl}/train-text-model`, respuestas)
    );
    return response.data;
  }

  async predictText(texto: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.msPythonUrl}/predict-text`, { texto })
    );
    return response.data;
  }

  // Model Management
  async resetTextModel(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.delete(`${this.msPythonUrl}/reset-text-model`)
    );
    return response.data;
  }

  async getTextModelStatus(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msPythonUrl}/text-model-status`)
    );
    return response.data;
  }

  async getHealth(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.msPythonUrl}/health`)
    );
    return response.data;
  }
}
