import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  Logger.log(`Running Node ${process.version} on ${process.platform} ${process.arch}`);
  Logger.log(`Access the application at http://localhost:3000`);
}
bootstrap();
