import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadGatewayException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
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
