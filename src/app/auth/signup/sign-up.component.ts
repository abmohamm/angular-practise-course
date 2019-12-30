import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isLoading = false;

  constructor(public authService: AuthService) { }

  ngOnInit() { }

  onSignUp(signUpForm: NgForm) {
     // console.log(signupForm.value);
     if (signUpForm.invalid) {
          return;
     }
     this.isLoading = true;
     this.authService.createUser(signUpForm.value.email, signUpForm.value.password);
  }

}
