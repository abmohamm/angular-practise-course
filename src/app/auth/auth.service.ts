import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  //  private tokenTimer: NodeJS.Timer;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(userEmail: string, userPassword: string) {
    const authData: AuthData = { email: userEmail, password: userPassword };
    this.http.post(environment.signupUrl, authData)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }

  login(userEmail: string, userPassword: string) {
    const authData: AuthData = { email: userEmail, password: userPassword };
    this.http.post<{ token: string, expiresIn: number, userId: string }>(environment.loginUrl, authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthenticationTimer(expiresInDuration);
          console.log(expiresInDuration);
          this.authStatusListener.next(true);
          this.userId = response.userId;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthenticationData(token, expirationDate, this.userId);
          this.isAuthenticated = true;
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
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
      this.userId = authenticationInformation.userId;
      this.setAuthenticationTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
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

  private saveAuthenticationData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuthenticationData() {
    const tkn = localStorage.getItem('token');
    const expirationDate = localStorage.get('expirationDate');
    const userIdLocalStorage = localStorage.getItem('userId');
    if (!tkn || !expirationDate) {
      return;
    }
    return {
      token: tkn,
      expirationDate: new Date(expirationDate),
      userId: userIdLocalStorage
    };
  }
}
