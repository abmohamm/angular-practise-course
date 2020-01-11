import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { CreateEmployeesComponent } from './employees/create-employees/create-employees.component';
import { AuthGuard } from './auth/auth-guard';


const routes: Routes = [
  { path: '', component: EmployeesListComponent },  // http://localhost:4200/
  { path: 'create', component: CreateEmployeesComponent, canActivate: [AuthGuard] },  // http://localhost:4200/create
  { path: 'edit/:employeeId', component: CreateEmployeesComponent, canActivate: [AuthGuard] }, // http://localhost:4200/edit/{}
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
