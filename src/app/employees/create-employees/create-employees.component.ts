import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from '../employee.model';
import { mimeType } from './mime-type.validator';

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
  employeeForm: FormGroup;
  filePreview: string;
  private mode = 'create';
  private empId: string;

  constructor(employeesService: EmployeesService, public route: ActivatedRoute) {
    this.employeesService = employeesService;
  }
  ngOnInit() {
    this.employeeForm = new FormGroup({
        empFirstName: new FormControl(null, { validators: [Validators.required, Validators.minLength(10)] }),
        empLastName: new FormControl(null, { validators: [Validators.required] }),
        empEmailId: new FormControl(null, { validators: [Validators.required] }),
        employeeId: new FormControl(null, { validators: [Validators.required] }),
        description: new FormControl(null, { validators: [Validators.required] }),
        uploadedFile: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType] })
    });
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
                                      description: employeeData.description,
                                      imagePath: null
                                    };
                    this.employeeForm.setValue({ empFirstName: this.employee.empFirstName,
                                              empLastName: this.employee.empLastName,
                                              empEmailId: this.employee.empEmailId,
                                              employeeId: this.employee.employeeId,
                                              description: this.employee.description });
                });
        } else {
            this.mode = 'create';
            this.empId = null;
        }
    });
  }

  onFilePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.employeeForm.patchValue({uploadedFile: file});
      this.employeeForm.get('uploadedFile').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
          this.filePreview = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
  }

  /* onAddEmployee() {const employee = { empFirstName: this.empFirstName, empLastName: this.empLastName,
      empEmailId: this.empEmailId, employeeId: this.employeeId, description:  this.description };
    this.employeeCreated.emit(employee);
    //  console.dir(employeeInput);
    //  alert('employee added successfully!!!');
  } */

  onSaveEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.empFirstName = this.employeeForm.value.empFirstName;
    this.empLastName = this.employeeForm.value.empLastName;
    this.empEmailId = this.employeeForm.value.empEmailId;
    this.employeeId = this.employeeForm.value.employeeId;
    this.description = this.employeeForm.value.description;
    /* const employee = { empFirstName: employeeForm.value.empFirstName,
  empLastName: employeeForm.value.empLastName, empEmailId: employeeForm.value.empEmailId,
  employeeId: employeeForm.value.employeeId, description: employeeForm.value.description }; */
    if (this.mode === 'create') {
      this.employeesService.addEmployee( this.employeeForm.value.empFirstName,
                                         this.employeeForm.value.empLastName,
                                         this.employeeForm.value.empEmailId,
                                         this.employeeForm.value.employeeId,
                                         this.employeeForm.value.description,
                                         this.employeeForm.value.image );
    } else {
      this.employeesService.updateEmployee(this.employeeForm.value.empFirstName,
                                           this.employeeForm.value.empLastName,
                                           this.employeeForm.value.empEmailId,
                                           this.employeeForm.value.employeeId,
                                           this.employeeForm.value.description );
    }
    this.employeeForm.reset();
  }
}
