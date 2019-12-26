import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule,  MatCardModule,
         MatButtonModule, MatToolbarModule,
         MatExpansionModule, MatProgressSpinnerModule,
         MatPaginatorModule} from '@angular/material';

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
    BrowserModule,  AppRoutingModule, ReactiveFormsModule,  BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,
    MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, HttpClientModule
  ],
  // providers: [EmployeesService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
