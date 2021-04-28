import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../user.model';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (user === null) {
          return next.handle(req);
        }
        const headers = req.headers.append(
          'Authorization',
          `Bearer ${user.token}`
        );
        let modifiedReq = req.clone({ headers });
        return next.handle(modifiedReq);
      })
    );
  }
}
