import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  private baseUrl = 'https://fierce-shore-32592.herokuapp.com';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
      'Access-Control-Allow-Headers': 'accept, content-type'
    })
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(req, next) {
    const reqWithUrl = req.clone({
      url: this.appendBaseUrl(req.url)
    });
    const token = this.authService.getToken();
    if (token == null || token === '') {
      if (this.router.url !== '/login' && this.router.url !== '/login/') {
        this.router.navigate(['/login']);
      }
      return next.handle(reqWithUrl);
    }

    const tokenizedReq = reqWithUrl.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next
      .handle(tokenizedReq).pipe(
        catchError((errorResponse: HttpErrorResponse) => {
            if (errorResponse.status === 401 || errorResponse.status === 400) {
              this.authService.logOut();
              this.router.navigate(['/login']);
            }
            return throwError(errorResponse);
          })
      );
  }

  appendBaseUrl(url) {
    if (url.startsWith('http')) {
      return url;
    }
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    return this.baseUrl + url;
  }
}
