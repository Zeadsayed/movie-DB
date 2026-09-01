import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

type AuthUser = Omit<LoginResponse, 'accessToken' | 'refreshToken'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject<any>(null);

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
  ) {}

  login(formData: LoginCredentials): Observable<LoginResponse> {
    return this._HttpClient.post<LoginResponse>(
      'https://dummyjson.com/auth/login',
      {
        ...formData,
        expiresInMins: 30,
      },
      { withCredentials: true },
    );
  }

  saveSession(response: LoginResponse): void {
    this.storeTokens(response);
    localStorage.setItem('username', response.username);
    this.userData.next(response);
  }

  getCurrentUser(accessToken: string): Observable<AuthUser> {
    return this._HttpClient.get<AuthUser>('https://dummyjson.com/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
  }

  refreshSession(): Observable<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      this.clearSession();
      return of(false);
    }

    return this._HttpClient
      .post<AuthTokens>(
        'https://dummyjson.com/auth/refresh',
        { refreshToken, expiresInMins: 30 },
        { withCredentials: true },
      )
      .pipe(
        tap((tokens) => this.storeTokens(tokens)),
        switchMap((tokens) => this.getCurrentUser(tokens.accessToken)),
        tap((user) => {
          localStorage.setItem('username', user.username);
          this.userData.next(user);
        }),
        map(() => true),
        catchError(() => {
          this.clearSession();
          return of(false);
        }),
      );
  }

  ensureAuthenticated(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return this.refreshSession();
    }

    return this.getCurrentUser(accessToken).pipe(
      tap((user) => {
        localStorage.setItem('username', user.username);
        this.userData.next(user);
      }),
      map(() => true),
      catchError(() => this.refreshSession()),
    );
  }

  private storeTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  private clearSession(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    this.userData.next(null);
  }

  logOut() {
    this.clearSession();
    this._Router.navigate(['login']);
  }
}
