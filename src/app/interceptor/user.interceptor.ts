import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../servicios/token.service';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
 

  const tokenService = inject(TokenService);
  const isApiAuth = req.url.includes("auth");
  const isApiAdmin = req.url.includes("administrator");
  const isApiEmploy = req.url.includes("employed");
  
 
 
  if (!tokenService.isLogged() || isApiAuth || isApiAdmin || isApiEmploy) {
    return next(req);
  }
 
 
  const token = tokenService.getToken();
 
 
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
 
  return next(authReq);
};
