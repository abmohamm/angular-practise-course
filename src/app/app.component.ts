import { Component, OnInit } from '@angular/core';
import { Employee } from './employees/employee.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  employeesAdded: Employee[] = [];

  ngOnInit() {
    this.authService.autoAuthenticateUser();
  }

  onEmployeeAdded(employee: Employee) {
    this.employeesAdded.push(employee);
  }
}
