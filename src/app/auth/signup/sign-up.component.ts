import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSubscription: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
          this.isLoading = false;
      }
    );
   }

  onSignUp(signUpForm: NgForm) {
     // console.log(signupForm.value);
     if (signUpForm.invalid) {
          return;
     }
     this.isLoading = true;
     this.authService.createUser(signUpForm.value.email, signUpForm.value.password);
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
