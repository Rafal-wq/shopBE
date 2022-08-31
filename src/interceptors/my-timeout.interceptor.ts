import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class MyTimeoutInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(timeout(5000)); //po 5 sek wyrzuci błąd
    // catchError((err) => {
    //   if (err instanceof TimeoutError) {
    //     return throwError(() => new RequestTimeoutException());
    //   } else {
    //     return throwError(err);
    //   }
    // });
  }
}
