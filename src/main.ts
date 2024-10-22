/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  console.log('Starting bootstrap...');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(json({ limit: '200mb' }));
  console.log('NestFactory.create(AppModule) success');
  const port = process.env.PORT || 3000;
  await app.listen(port)
  console.log(`Listening on port ${port}....`);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
