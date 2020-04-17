import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getcourse(): any {
    return this.http.get('http://localhost:3000/get-course');
  }

  postcourse(data) {
    return this.http.post('http://localhost:3000/post-course', data);
  }

  postEditcourse(data) {
    return this.http.post('http://localhost:3000/post-edit-course', data);
  }


  deletecourse(data) {
    return this.http.post('http://localhost:3000/delete-course', data);
  }

  getroles() {
    return this.http.get('http://localhost:3000/get-roles');
  }

  postroles(data): any {
    return this.http.post('http://localhost:3000/post-roles', data);
  }

  deleterole(data) {
    return this.http.post('http://localhost:3000/delete-roles', data);
  }

  subjectInCourse(s): any {
    return this.http.post('http://localhost:3000/subject-in-course', s);
  }

  subjectInCourseDel(d): any {
    // console.log('inService' + JSON.stringify(d));
    return this.http.post('http://localhost:3000/subject-in-course-del', d);
  }

  addQuery(q): any {
    return this.http.post('http://localhost:3000/student-new-lead', q);
  }

  getLead(): any {
    return this.http.get('http://localhost:3000/get-lead');
  }

  followupStudent(f): any {
    // console.log('in service ' + JSON.stringify(f));
    return this.http.post('http://localhost:3000/folloup-student', f );
  }

  registerStudentPush(s): any {
    return this.http.post('http://localhost:3000/student-register', s);
  }

  registeredStudents(): any {
    return this.http.get('http://localhost:3000/registered-students');
  }

  editStudentUpdatePush(data): any {
    return this.http.post('http://localhost:3000/edit-student', data);
  }

}
