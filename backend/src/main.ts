import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEnv } from './config/env';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await ConfigModule.envVariablesLoaded;
  await app.listen(getEnv().PORT);
}
bootstrap();
