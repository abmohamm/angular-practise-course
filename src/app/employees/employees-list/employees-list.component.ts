import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnDestroy {

  // @Input() newEmployees: Employee[] = [];
  newEmployees: Employee[] = [];
  isLoading = false;
  totalEmployees = 0; // This represents how many records are available in bach-end and will be determined dynamically;
  employeesPerPage = 2; // This represents how many records should be present in each page
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]; // This represents/helps user to choose how many records should be present in each page
  isUserAuthenticated = false;
  userId: string;
  employeesService: EmployeesService;
  private employeeSubscription: Subscription;
  private authStatusSubscription: Subscription;

  constructor(employeesService: EmployeesService, private authService: AuthService) {
    this.employeesService = employeesService;
  }

  ngOnInit() {
    this.isLoading = true;
    this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.employeeSubscription = this.employeesService.getEmployeesUpdated()
      .subscribe((employeeData: { employees: Employee[], employeeCount: number }) => {
        this.isLoading = false;
        this.totalEmployees = employeeData.employeeCount;
        this.newEmployees = employeeData.employees;
      });
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSubscription = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();

      });
  }

  onPageChanged(pageInformation: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageInformation.pageIndex + 1;
    this.employeesPerPage = pageInformation.pageSize;
    this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
  }

  onDelete(employeeId: string) {
    this.isLoading = true;
    this.employeesService.deleteEmployee(employeeId)
      .subscribe(() => {
        this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
      }, () => {
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

}
