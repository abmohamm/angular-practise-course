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

    getEmployee(empId: string) {
      return {...this.employees.find(employee => employee.employeeId === empId)};

    }

    addEmployee(empFName: string, empLName: string, empEmaId: string, empId: string, descriptionn: string) {
        const employee: Employee = {  empFirstName: empFName, empLastName: empLName, empEmailId: empEmaId,
                                      employeeId: empId, description: descriptionn };
        this.http.post<{message: string, status: string, id: string}>(this.API_URL, employee)
            .subscribe((response) => {
                console.log(response.message);
                console.log(response.status);
                const id = response.id;
                //  employee.id = id;//mongodb creates a new id for every document
                this.employees.push(employee);
                this.employeesUpdated.next([...this.employees]);
        });
    }

    updateEmployee( employeeFirstName: string, employeeLastName: string, employeeEmailId: string,
                    empId: string, employeeDescription: string) {
      const employee: Employee = { empFirstName: employeeFirstName,
                                   empLastName: employeeLastName,
                                   empEmailId: employeeEmailId,
                                   description:  employeeDescription,
                                   employeeId: empId };
      this.http.put(this.API_URL + empId, employee)
               .subscribe((responseData) => {
                 console.log('Response after updating : ' + responseData);
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
