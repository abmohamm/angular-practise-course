import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { CreateEmployeesComponent } from './employees/create-employees/create-employees.component';

const routes: Routes = [
  { path: '', component: EmployeesListComponent },  // http://localhost:4200/
  { path: 'create', component: CreateEmployeesComponent},  // http://localhost:4200/create
  { path: 'edit/:employeeId', component: CreateEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
