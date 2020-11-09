import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(
        err => {
          if (err instanceof ApiException) {
            return throwError(err);
          }
          if (err.response && err.status) {
            return throwError(
              new HttpException(
                {
                  message: err.response.message,
                  errorCode: err.response.errorCode,
                },
                err.status,
              ),
            );
          }
          Logger.error(err)
          return throwError(
            new HttpException(
              {
                message: '未知错误',
                errorCode: '-1',
              },
              HttpStatus.BAD_GATEWAY,
            ),
          );
        },
        // throwError(new HttpException('New message', HttpStatus.BAD_GATEWAY)),
      ),
    );
  }
}
