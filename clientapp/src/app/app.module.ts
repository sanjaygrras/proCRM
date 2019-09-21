import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { RolesComponent } from './roles/roles.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ActionButtonDirective } from './action-button.directive';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StudentComponent,
    CourseComponent,
    RolesComponent,
    WelcomeComponent,
    ActionButtonDirective,
    ManagePermissionsComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
