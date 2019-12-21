import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
 // @Output() employeeCreated = new EventEmitter<Employee>();
  empFirstName  = '';
  empLastName  = '';
  empEmailId  = '';
  employeeId = '';
  description = '';
  employeesService: EmployeesService;
  private mode = 'create';
  private empId: string;
  private employee: Employee;

  constructor(employeesService: EmployeesService, public route: ActivatedRoute) {
    this.employeesService = employeesService;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('employeeId')) {
            this.mode = 'edit';
            this.empId = paramMap.get('employeeId');
            this.employee = this.employeesService.getEmployee(this.empId);
        } else {
            this.mode = 'create';
            this.empId = null;
        }
    });
  }

  /* onAddEmployee() {const employee = { empFirstName: this.empFirstName, empLastName: this.empLastName,
      empEmailId: this.empEmailId, employeeId: this.employeeId, description:  this.description };
    this.employeeCreated.emit(employee);
    //  console.dir(employeeInput);
    //  alert('employee added successfully!!!');
  } */

  onAddEmployee(employeeForm: NgForm) {
    if (employeeForm.invalid) {
      return;
    }
    /* const employee = { empFirstName: employeeForm.value.empFirstName,
  empLastName: employeeForm.value.empLastName, empEmailId: employeeForm.value.empEmailId,
  employeeId: employeeForm.value.employeeId, description: employeeForm.value.description }; */
    this.employeesService.addEmployee( employeeForm.value.empFirstName, employeeForm.value.empLastName,
                                       employeeForm.value.empEmailId, employeeForm.value.employeeId,
                                       employeeForm.value.description );
    employeeForm.reset();
  }
}
