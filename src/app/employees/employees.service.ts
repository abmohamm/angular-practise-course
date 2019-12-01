import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employees: Employee[] = [];
  private employeesUpdated = new Subject<Employee[]>();
  constructor() { }

//  Below method returns copy of original employees array declared as private.
//  Adding/Removing elements to/from below returning array will not effect original
//  private array - suggested approach
    getEmployees() {
        // return [...this.employees];
        return this.employees;
    }

    getEmployeesUpdated() {
      return this.employeesUpdated.asObservable();
    }

    addEmployee(empFName: string, empLName: string, empEmaId: string, empId: string, descriptionn: string) {
        const employee: Employee = {  empFirstName: empFName,
                                      empLastName: empLName,
                                      empEmailId: empEmaId,
                                      employeeId: empId,
                                      description: descriptionn };
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
    }
}