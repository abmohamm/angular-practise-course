import { Component } from '@angular/core';
import { Employee } from './employees/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    employeesAdded: Employee[] = [];

    onEmployeeAdded(employee: Employee)  {
        this.employeesAdded.push(employee);
    }
}
