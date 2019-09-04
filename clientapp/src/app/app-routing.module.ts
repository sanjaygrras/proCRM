import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { RolesComponent } from './roles/roles.component';


const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent, canActivate:[AuthGuard], children:[
    {path:"roles", component:RolesComponent},
    {path:"students", component:StudentComponent},
    {path:"course", component:CourseComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
