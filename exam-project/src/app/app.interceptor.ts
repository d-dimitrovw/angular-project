import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

const apiUrl = 'http://localhost:3000/api';
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true
    });
  }

  const router = inject(Router)

  // return next(req).pipe(
  //   catchError((err) => {
  //     if(err.status === 401) {
  //       router.navigate(['/home'])
  //     } else {
  //       router.navigate(['/error'])
  //     }
  //     return [err]
  //   }
  // )
  // );
  return next(req);
};
