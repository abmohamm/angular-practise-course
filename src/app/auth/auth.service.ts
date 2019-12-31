import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  //  private tokenTimer: NodeJS.Timer;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  SIGN_UP_API_URL: 'http://localhost:3000/api/user/signup';
  LOGIN_API_URL: 'http://localhost:3000/api/user/login';

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(userEmail: string, userPassword: string) {
    const authData: AuthData = { email: userEmail, password: userPassword };
    this.http.post(this.SIGN_UP_API_URL, authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(userEmail: string, userPassword: string) {
    const authData: AuthData = { email: userEmail, password: userPassword };
    this.http.post<{ token: string, expiresIn: number }>(this.LOGIN_API_URL, authData)
      .subscribe(response => {
        // console.log(response);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthenticationTimer(expiresInDuration);
          console.log(expiresInDuration);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthenticationData(token, expirationDate);
          this.isAuthenticated = true;
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthenticateUser() {
    const authenticationInformation = this.getAuthenticationData();
    if (!authenticationInformation) {
        return;
    }
    const now = new Date();
    // const isInFuture = authInformation.expirationDate > now;
    const expiresIn = authenticationInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authenticationInformation.token;
      this.isAuthenticated = true;
      this.setAuthenticationTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthenticationData();
    this.router.navigate(['/']);
  }

  private setAuthenticationTimer(expiresInDuration) {
    console.log('Setting Timer : ' + expiresInDuration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000);
  }

  private saveAuthenticationData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private clearAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  private getAuthenticationData() {
    const tkn = localStorage.getItem('token');
    const expirationDate = localStorage.get('expirationDate');
    if (!tkn || !expirationDate) {
      return;
    }
    return {
      token: tkn,
      expirationDate: new Date(expirationDate)
    };
  }
}
