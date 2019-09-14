import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { RolesComponent } from './roles/roles.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent, canActivate:[AuthGuard], children:[
    {path:"", component:WelcomeComponent},
    {path:"roles", component:RolesComponent},
    {path:"students", component:StudentComponent},
    {path:"course", component:CourseComponent},
    {path:"managePermission", component:ManagePermissionsComponent},
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
