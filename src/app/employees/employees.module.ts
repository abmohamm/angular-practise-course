import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    CreateEmployeesComponent,
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    CreateEmployeesComponent,
    EmployeesListComponent
  ]
})
export class EmployeesModule { }
