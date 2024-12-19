import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user/user-service.service';
import { AuthUser } from './types/user';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const userService = inject(UserService);

  const clonedRequest = req.clone({
    withCredentials: true
  });

  return next(clonedRequest).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        if (event.url?.includes('/login') || event.url?.includes('/register')) {
          const user = event.body as AuthUser;
          userService.setUser(user);
        } else if (event.url?.includes('/logout')) {
          userService.clearUser();
        }
      }
    })
  );
};