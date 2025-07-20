import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('Request');
    const ip = req.ip || req.connection.remoteAddress || 'unknown IP';
    const method = req.method;
    const url = req.originalUrl;
    const userAgent = req.headers['user-agent'] || 'unknown agent';
    const timestamp = new Date().toISOString();

    const log = `[${timestamp}] ${method} ${url} - IP: ${ip} - Agent: ${userAgent}`;

    logger.log(log);
    next();
  }
}
