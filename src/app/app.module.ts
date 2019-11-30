import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule,MatCardModule,
         MatButtonModule,MatToolbarModule,
         MatExpansionModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';
import { HeaderComponent } from './headers/header/header.component';
import { PostsListComponent } from './posts/posts-list/posts-list/posts-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostsComponent,
    HeaderComponent,
    PostsListComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule,BrowserAnimationsModule,
    MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule,MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
