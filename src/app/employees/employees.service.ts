import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  API_URL: 'http://localhost:3000/api/employees';

  private employees: Employee[] = [];
  private employeesUpdated = new Subject<Employee[]>();
  constructor(private http: HttpClient) { }

//  Below method returns copy of original employees array declared as private.
//  Adding/Removing elements to/from below returning array will not effect original
//  private array - suggested approach
    getEmployees() {
        return this.http.get<{message: string, status: string, employees: any}>(this.API_URL)
                        .pipe(map((employeeData) => {
                            return employeeData.employees.map(employee => {
                               return {
                                  empFirstName: employee.empFirstName,
                                  empLastName: employee.empLastName,
                                  empEmailId: employee.empEmailId,
                                  employeeId: employee.employeeId,
                                  description:  employee.description
                               };
                            });
                        }))
                        .subscribe((employees) => {
                            this.employees = employees;
                            this.employeesUpdated.next([...this.employees]);
                      });
        // return [...this.employees];
        // return this.employees;
    }

    getEmployeesUpdated() {
      return this.employeesUpdated.asObservable();
    }

    addEmployee(empFName: string, empLName: string, empEmaId: string, empId: string, descriptionn: string) {
        const employee: Employee = {  empFirstName: empFName, empLastName: empLName, empEmailId: empEmaId,
                                      employeeId: empId, description: descriptionn };
        this.http.post<{message: string, status: string, employees: Employee[]}>(this.API_URL, employee)
            .subscribe((response) => {
                console.log(response.message);
                console.log(response.status);
                this.employees.push(employee);
                this.employeesUpdated.next([...this.employees]);
        });
    }

    deleteEmployee(employeeId: string) {
        this.http.delete(this.API_URL + employeeId)
        .subscribe(() => {
            const updatedEmployees = this.employees.filter(employee => employee.employeeId !== employeeId);
            this.employees = updatedEmployees;
            this.employeesUpdated.next([...this.employees]);
        });
    }
}
