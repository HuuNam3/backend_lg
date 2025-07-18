import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.user = 'hello';
    let isAuth = false;
    if (!isAuth) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Unauthorized',
      });
    }
    next();
  }
}
