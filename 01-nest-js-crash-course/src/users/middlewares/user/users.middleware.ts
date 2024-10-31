import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('User Middleware');

    const { authorization } = req.headers;

    if (!authorization || authorization !== 'clear-to-connect') {
      throw new HttpException(
        'Invalid Authorization Token',
        HttpStatus.FORBIDDEN,
      );
    } else {
      console.log('Clear to connect');
      next();
    }
  }
}
