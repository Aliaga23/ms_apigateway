import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { PlanesModule } from './modules/planes/planes.module';
import { SuscripcionesModule } from './modules/suscripciones/suscripciones.module';
import { CanalesModule } from './modules/canales/canales.module';
import { TipoPreguntaModule } from './modules/tipo-pregunta/tipo-pregunta.module';
import { EncuestasModule } from './modules/encuestas/encuestas.module';
import { PreguntasModule } from './modules/preguntas/preguntas.module';
import { OpcionEncuestaModule } from './modules/opcion-encuesta/opcion-encuesta.module';
import { RespuestasModule } from './modules/respuestas/respuestas.module';
import { EntregasModule } from './modules/entregas/entregas.module';
import { DestinatariosModule } from './modules/destinatarios/destinatarios.module';
import { CampanasModule } from './modules/campanas/campanas.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { MlAnalysisModule } from './modules/ml-analysis/ml-analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    UsuariosModule,
    PlanesModule,
    SuscripcionesModule,
    CanalesModule,
    TipoPreguntaModule,
    EncuestasModule,
    PreguntasModule,
    OpcionEncuestaModule,
    RespuestasModule,
    EntregasModule,
    DestinatariosModule,
    CampanasModule,
    AnalyticsModule,
    ChatbotModule,
    MlAnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
