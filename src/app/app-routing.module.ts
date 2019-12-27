import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { CreateEmployeesComponent } from './employees/create-employees/create-employees.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: EmployeesListComponent },  // http://localhost:4200/
  { path: 'create', component: CreateEmployeesComponent},  // http://localhost:4200/create
  { path: 'edit/:employeeId', component: CreateEmployeesComponent}, // http://localhost:4200/edit/{}
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
