import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    let tokenizedReq
    if (localStorage.getItem('token')) {
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      return next.handle(tokenizedReq)
    } else {
      return next.handle(req)
    }


  }
}
