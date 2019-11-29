import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class CreatePostsComponent implements OnInit {

  newPost = 'NO CONTENT';
  enteredValue = '';
  constructor() { }

  ngOnInit() {
  }

  onAddPost(postInput: HTMLTextAreaElement){

    console.dir(postInput);
    this.newPost = postInput.value;
    alert('post added successfully!!!');
  }
}
