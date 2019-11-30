import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

      @Input()  newemployees = [];

      // employees = [
      //   {firstname: 'Steven',  lastname: 'King', email: 'sking@gmail.com', jobid: 'AD_PRES', description: 'Program Manager'},
      //   {firstname: 'Neena',  lastname: 'Kochhar', email: 'nkochhar@gmail.com', jobid: 'AD_VP', description:  'Application Developer'},
      //   {firstname: 'Lex',  lastname: 'De haan', email: 'ldehaan@gmail.com', jobid: 'AD_VP', description: 'Vice President'},
      //   {firstname: 'Alexander',  lastname: 'Hunold', email: 'ahunold@gmail.com', jobid: 'IT_PROG', description: 'QA Tester'},
      //   {firstname: 'Bruce',  lastname: 'Ernst', email: 'bernst@gmail.com', jobid: 'AD_PRES', description: 'Data Analyst'}
      // ];

  constructor() {
    // this.newemployees.push(this.employees);
  }

  ngOnInit() {
    //  this.newemployees.push(this.employees);
  }

}
