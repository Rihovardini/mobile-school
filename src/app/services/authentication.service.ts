import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public Url = 'signin';
  private refreshUrl = 'refresh';
  private tokenRefreshMinPeriod: number;
  private tokenRefreshTimestamp: number;
  private _idUser: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.tokenRefreshMinPeriod = 1000 * 60 * 5;
  }

  login(userName: string, password: string) {
    const userData = { username: userName, password: password };
    return this.httpClient
      .post(this.Url, userData, { observe: 'response' })
      .pipe(
        map((response: any) => {
          if (
            response.status === 204 &&
            this.getDecodeRole(response.headers.get('Authorization'))
          ) {
            this.tokenRefreshTimestamp = new Date().getTime();
            localStorage.setItem(
              'authToken',
              response.headers.get('Authorization')
            );
            return response;
          } else {
            throw new Error('Невірні дані');
          }
        })
      );
  }

  get idUser(): number {
    if (this._idUser) {
      return this._idUser;
    } else {
      const token = localStorage.getItem('authToken');
      if (token) {
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(token);
        this._idUser = decodedToken.jti;
        return this._idUser;
      } else {
        console.error('Token not found!!!');
      }
    }
  }

  public getToken() {
    return localStorage.getItem('authToken');
  }

  public logOut() {
    this.tokenRefreshTimestamp = null;
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  public loggedIn() {
    return !!localStorage.getItem('authToken');
  }

  public getRole(): string {
    return this.getDecodedToken().Roles.authority;
  }

  public getRoleLocalizedName(): string {
    switch (this.getRole()) {
      case 'ROLE_ADMIN':
        return 'Адміністратор';
      case 'ROLE_TEACHER':
        return 'Вчитель';
      case 'ROLE_USER':
        return 'Користувач';
    }
  }

  public defaultRoute(): string {
    const role = this.getRole();
    if (role === 'ROLE_USER') {
      return '/student-book/diary';
    }
  }

  public isAdmin() {
    return this.getRole() === 'ROLE_ADMIN';
  }

  public refreshToken() {
    if (!this.loggedIn()) {
      return;
    }
    const curTime = new Date().getTime();
    if (this.tokenRefreshTimestamp) {
      const timeFromlastRefresh = curTime - this.tokenRefreshTimestamp;
      if (timeFromlastRefresh < this.tokenRefreshMinPeriod) {
        return;
      }
    }
    this.httpClient.get(this.refreshUrl).subscribe(
      response => {
        this.tokenRefreshTimestamp = curTime;
      },
      err => {
        console.warn('failed to refresh token with error: ' + err);
      }
    );
  }

  public getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken;
  }

  public getCurrentUserId(): string {
    return this.getDecodedToken().jti;
  }

  private getDecodeRole(token) {
    const jwt = new JwtHelperService();
    const role = jwt.decodeToken(token).Roles.authority;
    if (role === 'ROLE_USER') {
      return true;
    } else {
      return false;
    }
  }

  public getStudent(idStudent): Observable<any> {
    return this.httpClient.get('students/' + idStudent).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }
}
