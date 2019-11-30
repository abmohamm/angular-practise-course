import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

      @Input() newEmployees: Employee[] = [];

      // employees = [
      //   {firstname: 'Steven',  lastname: 'King', email: 'sking@gmail.com', jobid: 'AD_PRES', description: 'Program Manager'},
      //   {firstname: 'Neena',  lastname: 'Kochhar', email: 'nkochhar@gmail.com', jobid: 'AD_VP', description:  'Application Developer'},
      //   {firstname: 'Lex',  lastname: 'De haan', email: 'ldehaan@gmail.com', jobid: 'AD_VP', description: 'Vice President'},
      //   {firstname: 'Alexander',  lastname: 'Hunold', email: 'ahunold@gmail.com', jobid: 'IT_PROG', description: 'QA Tester'},
      //   {firstname: 'Bruce',  lastname: 'Ernst', email: 'bernst@gmail.com', jobid: 'AD_PRES', description: 'Data Analyst'}
      // ];

  constructor() {}

  ngOnInit() { }

}
