import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
  @Output() employeeCreated = new EventEmitter<Employee>();
  empFirstName  = '';
  empLastName  = '';
  empEmailId  = '';
  employeeId = '';
  description = '';

  constructor() {}
  ngOnInit() {}

  onAddEmployee() {
    const employee = { empFirstName: this.empFirstName,
                       empLastName: this.empLastName,
                       empEmailId: this.empEmailId,
                       employeeId: this.employeeId,
                       description:  this.description };
    this.employeeCreated.emit(employee);
    //  console.dir(employeeInput);
    //  alert('employee added successfully!!!');
  }
}
