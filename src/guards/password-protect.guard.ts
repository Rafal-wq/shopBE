import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PasswordProtectGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.headers['x-password'] === '1234';
  }
}
