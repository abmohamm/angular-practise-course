import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

      SIGN_UP_API_URL: 'http://localhost:3000/api/user/signup';
      // LOGIN_API_URL: 'http://localhost:3000/api/user/signup';

      constructor(private http: HttpClient) { }

      createUser(userEmail: string, userPassword: string) {
          const authData: AuthData = { email: userEmail, password: userPassword };
          this.http.post(this.SIGN_UP_API_URL, authData)
                   .subscribe((response) => {
                     console.log(response);
             });
      }
}
