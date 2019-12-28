import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule,  MatCardModule,
         MatButtonModule, MatToolbarModule,
         MatExpansionModule, MatProgressSpinnerModule,
         MatPaginatorModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './headers/header.component';
import { CreateEmployeesComponent } from './employees/create-employees/create-employees.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesService } from './employees/employees.service';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeesComponent,
    HeaderComponent,
    EmployeesListComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,  AppRoutingModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,
    MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, HttpClientModule
  ],
  // providers: [EmployeesService],
  providers: [EmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
