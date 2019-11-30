import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class CreatePostsComponent implements OnInit {
  @Output() employeeCreated = new EventEmitter();
  empFName  = '';
  empLName  = '';
  empEmail  = '';
  empId = '';
  description = '';
  //  enteredValue = '';

  constructor() { }
  ngOnInit() {}

  onAddEmployee() {
    const employee = { empFirstName: this.empFName, empLastName: this.empLName,
                  empEmailId: this.empEmail, employeeId: this.empId, description:  this.description };
    this.employeeCreated.emit(employee);
    //  console.dir(postInput);
    //  alert('post added successfully!!!');
  }
}
