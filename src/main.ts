import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadGatewayException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { winstonLogger } from './logger/winston.logger';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'https://lang-go-nine.vercel.app',
      'https://backend-lg.onrender.com',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[] = []) => {
        return new BadGatewayException(
          errors.map((error) => ({
            [error.property]: Object.values(error.constraints || {}),
          })),
        );
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
