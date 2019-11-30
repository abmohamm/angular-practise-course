import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class CreatePostsComponent implements OnInit {
  empfname  = '';
  emplname  = '';
  empemail  = '';
  empid = '';
  description = '';

  @Output() employeecreated = new EventEmitter();
  enteredValue = '';
  constructor() { }

  ngOnInit() {
  }

  onAddPost() {
    const employee = {
        empfirstname: this.empfname,
        emplastname:  this.emplname,
        empemailid: this.empemail,
        employeeid: this.empid,
        description:  this.description
    };
    this.employeecreated.emit(employee);

    //  console.dir(postInput);
    //  alert('post added successfully!!!');
  }
}
