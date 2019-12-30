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
          console.log(expiresInDuration);
          this.tokenTimer = setTimeout(() => {
                                        this.logout();
                                      }, expiresInDuration * 1000);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
}
