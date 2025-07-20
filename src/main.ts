import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadGatewayException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { winstonLogger } from './logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: winstonLogger,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
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
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
