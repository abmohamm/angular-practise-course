import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

      employees = [
        {firstname: 'steven',  lastname: 'king', email: 'sking@gmail.com', jobid: 'ad_pres'},
        {firstname: 'neena',  lastname: 'kochhar', email: 'nkochhar@gmail.com', jobid: 'ad_vp'},
        {firstname: 'lex',  lastname: 'de haan', email: 'ldehaan@gmail.com', jobid: 'ad_vp'},
        {firstname: 'alexander',  lastname: 'hunold', email: 'ahunold@gmail.com', jobid: 'it_prog'},
        {firstname: 'bruce',  lastname: 'ernst', email: 'bernst@gmail.com', jobid: 'ad_pres'}
      ];

  constructor() { }

  ngOnInit() {
  }

}
