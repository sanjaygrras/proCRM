import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getcourse() {
    return this.http.get('http://localhost:3000/get-course');
  }

  postcourse(data) {
    console.log('Backend Hit');
    return this.http.post('http://localhost:3000/post-course', data);
  }

  deletecourse(data) {
    return this.http.post('http://localhost:3000/delete-course', data);
  }

  getroles() {
    console.log("Backend Hit");
    return this.http.get('http://localhost:3000/get-roles');
  }

  postroles(data):any
  {
    console.log("Backend Hit");
    return this.http.post('http://localhost:3000/post-roles', data);
  }

  deleterole(data){
    console.log(data);
    return this.http.post('http://localhost:3000/delete-roles', data);
  }
}
