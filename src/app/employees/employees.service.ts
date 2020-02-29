import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/employees/';
@Injectable({ providedIn: 'root' })
export class EmployeesService {

  private employees: Employee[] = [];
<<<<<<< Updated upstream
  private employeesUpdated = new Subject<{ employees: Employee[], employeeCount: number }>();
  constructor(private http: HttpClient, private router: Router) { }
=======
  private employeesUpdated = new Subject<Employee[]>();
  constructor() { }

//  Below return statement returns copy of original employees array declared as private.
//  Adding/Removing elements to/from below returning array will not effect original
//  private array - suggested approach
// return [...this.employees];
    getEmployees() {
        return this.employees;
    }
>>>>>>> Stashed changes

  //  Below method returns copy of original employees array declared as private.
  //  Adding/Removing elements to/from below returning array will not effect original
  //  private array - suggested approach
  getEmployees(employeesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${employeesPerPage}&page=${currentPage}`;

    this.http.get<{ message: string, status: string, employees: any, maxEmployees: number }>(BACKEND_URL + queryParams)
      .pipe(map((employeeData) => {
        return {
          employees: employeeData.employees.map(employee => {
            return {
              empFirstName: employee.empFirstName,
              empLastName: employee.empLastName,
              empEmailId: employee.empEmailId,
              employeeId: employee.employeeId,
              description: employee.description,
              imagePath: employee.imagePath,
              creator: employee.creator
            };
          }),
          maxEmployees: employeeData.maxEmployees
        };
      })
      ).subscribe((transformedEmployeeData) => {
        this.employees = transformedEmployeeData.employees;
        this.employeesUpdated.next({
          employees: [...this.employees],
          employeeCount: transformedEmployeeData.maxEmployees
        });
      });
  }

  getEmployeesUpdated() {
    return this.employeesUpdated.asObservable();
  }

  getEmployee(empId: string) {
    // return {...this.employees.find(employee => employee.employeeId === empId)};
    // return this.http.get<Employee>(this.API_URL + empId);
    return this.http.get<{
      empFirstName: string, empLastName: string, empEmailId: string,
      employeeId: string, description: string, imagePath: string, creator: string
    }>(BACKEND_URL + empId);
  }

  addEmployee(empFName: string, empLName: string, empEmaId: string, empId: string, descriptionn: string, image: File) {
    // const employee: Employee = {  empFirstName: empFName, empLastName: empLName, empEmailId: empEmaId,
    //                               employeeId: empId, description: descriptionn };
    const employeeData = new FormData();
    employeeData.append('empFirstName', empFName);
    employeeData.append('empLastName', empLName);
    employeeData.append('empEmailId', empEmaId);
    employeeData.append('employeeId', empId);
    employeeData.append('description', descriptionn);
    employeeData.append('image', image);
    this.http.post<{ message: string, status: string, employee: Employee }>(BACKEND_URL, employeeData)
      .subscribe((responseData) => {
        // const employee: Employee = {
        //   empFirstName: responseData.employee.empFirstName,
        //   empLastName: responseData.employee.empLastName,
        //   empEmailId: responseData.employee.empEmailId,
        //   employeeId: responseData.employee.employeeId,
        //   description: responseData.employee.description,
        //   imagePath: responseData.employee.imagePath
        // };
        // //  const id = response.id;
        // //  employee.id = id;//mongodb creates a new id for every document
        // this.employees.push(employee);
        // this.employeesUpdated.next([...this.employees]);
        this.router.navigate(['/']);
      });
  }

  updateEmployee(employeeFirstName: string, employeeLastName: string, employeeEmailId: string,
                 empId: string, employeeDescription: string, image: File | string) {
    let employeeData: Employee | FormData;
    if (typeof (image) === 'object') {
      employeeData = new FormData();
      employeeData.append('empFirstName', employeeFirstName);
      employeeData.append('empLastName', employeeLastName);
      employeeData.append('empEmailId', employeeEmailId);
      employeeData.append('employeeId', empId);
      employeeData.append('description', employeeDescription);
      employeeData.append('image', image);
    } else {
      employeeData = {
        empFirstName: employeeFirstName,
        empLastName: employeeLastName,
        empEmailId: employeeEmailId,
        description: employeeDescription,
        employeeId: empId,
        imagePath: image,
        creator: null
      };
    }
    this.http.put(BACKEND_URL + empId, employeeData)
      .subscribe((responseData) => {
        const updatedEmployees = [...this.employees];
        const oldEmployeeIndex = updatedEmployees.findIndex(p => p.employeeId === empId);
        //  const employee: Employee = { empFirstName: employeeFirstName,
        //                               empLastName: employeeLastName,
        //                               empEmailId: employeeEmailId,
        //                               description:  employeeDescription,
        //                               employeeId: empId,
        //                               imagePath: image as string };
        //  updatedEmployees[oldEmployeeIndex] = employee;
        //  this.employees = updatedEmployees;
        //  this.employeesUpdated.next([...this.employees]);
        this.router.navigate(['/']);
      });
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete(BACKEND_URL + employeeId);
    // .subscribe(() => {
    //     const updatedEmployees = this.employees.filter(employee => employee.employeeId !== employeeId);
    //     this.employees = updatedEmployees;
    //     this.employeesUpdated.next([...this.employees]);
    // });
  }
}
