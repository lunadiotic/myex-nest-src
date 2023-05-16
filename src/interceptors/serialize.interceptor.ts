import {
  UseInterceptors,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('running before request handler');
    return next.handle().pipe(
      map((data: any) => {
        console.log('running before response sent');
      }),
    );
  }
}
