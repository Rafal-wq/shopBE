import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CacheItem } from '../cache/cache-item.entity';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const method = context.getHandler();
    const cacheTimeInSec = this.reflector.get<number>('cacheTimeInSec', method);
    const controllerName = context.getClass().name;
    const actionName = method.name;

    const cachedData = await CacheItem.findOne({
      where: {
        controllerName,
        actionName,
      },
    });
    if (cachedData) {
      if (+cachedData.createdAt + cacheTimeInSec * 1000 > +new Date()) {
        console.log('Using cashed data.');
        return of(JSON.parse(cachedData.dataJSON));
      } else {
        console.log('Removing old cache data', cachedData.id);
        await cachedData.remove();
      }
    }

    console.log('Generating live data');
    return next.handle().pipe(
      tap(async (data) => {
        const newCachedData = new CacheItem();
        newCachedData.controllerName = controllerName;
        newCachedData.actionName = actionName;
        newCachedData.dataJSON = JSON.stringify(data);
        await newCachedData.save();
      }),
    );
  }
}
