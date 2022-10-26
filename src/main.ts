import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: true,
  //
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   }),
  // );

  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
  );

  await app.listen(3001);
}
bootstrap();
