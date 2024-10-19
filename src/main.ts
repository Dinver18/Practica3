import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting bootstrap...');
  const app = await NestFactory.create(AppModule);
  console.log('NestFactory.create(AppModule) success');

  await app.listen(3000);
  console.log('Listening on port 3000...');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
