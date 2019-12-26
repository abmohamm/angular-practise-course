import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnDestroy {

  // @Input() newEmployees: Employee[] = [];
  newEmployees: Employee[] = [];
  isLoading = false;
  totalEmployees = 10; // This represents how many records are available in bach-end and will be determined dynamically;
  employeesPerPage = 2; // This represents how many records should be present in each page
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]; // This represents/helps user to choose how many records should be present in each page
  employeesService: EmployeesService;
  private employeeSubscription: Subscription;

  constructor(employeesService: EmployeesService) {
    this.employeesService = employeesService;
  }

      // employees = [
      //   {firstname: 'Steven',  lastname: 'King', email: 'sking@gmail.com', jobid: 'AD_PRES', description: 'Program Manager'},
      //   {firstname: 'Neena',  lastname: 'Kochhar', email: 'nkochhar@gmail.com', jobid: 'AD_VP', description:  'Application Developer'},
      //   {firstname: 'Lex',  lastname: 'De haan', email: 'ldehaan@gmail.com', jobid: 'AD_VP', description: 'Vice President'},
      //   {firstname: 'Alexander',  lastname: 'Hunold', email: 'ahunold@gmail.com', jobid: 'IT_PROG', description: 'QA Tester'},
      //   {firstname: 'Bruce',  lastname: 'Ernst', email: 'bernst@gmail.com', jobid: 'AD_PRES', description: 'Data Analyst'}
      // ];

  ngOnInit() {
    this.isLoading = true;
    this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
    this.employeeSubscription = this.employeesService.getEmployeesUpdated()
        .subscribe((employees: Employee[]) => {
          this.isLoading = false;
          this.newEmployees = employees;
      });
  }

  onPageChanged(pageInformation: PageEvent) {
    this.currentPage = pageInformation.pageIndex + 1;
    this.employeesPerPage = pageInformation.pageSize;
    this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
  }

  onDelete(employeeId: string){
    this.employeesService.deleteEmployee(employeeId);
  }

  ngOnDestroy() {
      this.employeeSubscription.unsubscribe();
  }

}
