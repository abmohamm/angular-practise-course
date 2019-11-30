import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 employeesAdded = [];

 onEmployeeAdded(employee)  {
    this.employeesAdded.push(employee);
 }
}
