import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule,  MatCardModule,
         MatButtonModule, MatToolbarModule,
         MatExpansionModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './headers/header/header.component';
import { CreateEmployeesComponent } from './employees/create-employees/create-employees.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesService } from './employees/employees.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeesComponent,
    HeaderComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,  AppRoutingModule, FormsModule,  BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,  MatExpansionModule, HttpClientModule
  ],
  // providers: [EmployeesService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
