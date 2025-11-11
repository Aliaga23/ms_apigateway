import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  exports: [HttpModule],
})
export class CommonModule {}
