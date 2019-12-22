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
  employee: Employee;
  isLoading = false;
  private mode = 'create';
  private empId: string;

  constructor(employeesService: EmployeesService, public route: ActivatedRoute) {
    this.employeesService = employeesService;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('employeeId')) {
            this.mode = 'edit';
            this.empId = paramMap.get('employeeId');
            this.isLoading = true;
            this.employeesService.getEmployee(this.empId)
                .subscribe((employeeData) => {
                    this.isLoading = false;
                    this.employee = { empFirstName: employeeData.empFirstName,
                                      empLastName: employeeData.empLastName,
                                      empEmailId: employeeData.empEmailId,
                                      employeeId: employeeData.employeeId,
                                      description: employeeData.description };
                });
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

  onSaveEmployee(employeeForm: NgForm) {
    if (employeeForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.empFirstName = employeeForm.value.empFirstName;
    this.empLastName = employeeForm.value.empLastName;
    this.empEmailId = employeeForm.value.empEmailId;
    this.employeeId = employeeForm.value.employeeId;
    this.description = employeeForm.value.description;
    /* const employee = { empFirstName: employeeForm.value.empFirstName,
  empLastName: employeeForm.value.empLastName, empEmailId: employeeForm.value.empEmailId,
  employeeId: employeeForm.value.employeeId, description: employeeForm.value.description }; */
    if (this.mode === 'create') {
      this.employeesService.addEmployee( this.empFirstName, this.empLastName,
                                         this.empEmailId, this.employeeId, this.description );
    } else {
      this.employeesService.updateEmployee(this.empFirstName, this.empLastName,
                                           this.empEmailId, this.employeeId, this.description );
    }
    employeeForm.resetForm();
  }
}
