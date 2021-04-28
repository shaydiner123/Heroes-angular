import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user.model';
import {
  ApiResponseData,
  ResponseError,
} from '../../shared/Models/ApiResponseData';

import { AuthResponseContent } from '../../shared/Models/AuthResponseContent';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorService } from '../../shared/Services/httpError.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private httpErrorService: HttpErrorService
  ) {}

  signup(username: string, password: string, email: string): Observable<any> {
    return this.http
      .post<ApiResponseData<AuthResponseContent>>(
        `${environment.apiUrl}/api/accounts/signup`,
        {
          username,
          password,
          email,
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        }),
        tap((response) => {
          this.handleAuth(response);
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<ApiResponseData<AuthResponseContent>>(
        `${environment.apiUrl}/api/accounts/login`,
        {
          username,
          password,
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        }),
        tap((response) => {
          this.handleAuth(response);
        })
      );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    //in case on of the credentials is invalid
    if (error.error?.error as ResponseError) {
      return throwError(error.error.error.messages);
    }
    //in case there is other unknown error
    this.httpErrorService.handleHttpError(error);
    return throwError([]);
  }

  handleAuth(response: ApiResponseData<AuthResponseContent>): void {
    let responseContent = response.content;
    let tokenDurationTimeMls: number =
      new Date(responseContent.token.expiresIn).getTime() -
      new Date().getTime();
    let user = new User(
      responseContent.token.tokenValue,
      new Date(responseContent.token.expiresIn),
      responseContent.user.username,
      responseContent.user.id
    );
    this.autoLogout(tokenDurationTimeMls);
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  logout(): void {
    this.user.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  autoLogin(): void {
    let userData: string = localStorage.getItem('user');
    if (userData !== null) {
      let userObj: {
        _token: string;
        expiresIn: string;
        username: string;
        userId: string;
      } = JSON.parse(userData);

      let user = new User(
        userObj._token,
        new Date(userObj.expiresIn),
        userObj.username,
        userObj.userId
      );
      if (user.token !== null) {
        let tokenDurationTimeMls =
          user.expiresIn.getTime() - new Date().getTime();
        this.autoLogout(tokenDurationTimeMls);
        this.user.next(user);
      }
    }
  }

  autoLogout(tokenDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenDuration);
  }
}
