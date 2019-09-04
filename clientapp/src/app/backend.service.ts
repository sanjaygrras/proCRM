import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }
  
  getcourses(){
    return this.http.get('http://localhost:3000/back-courses');
  }

  postcourses(data){
    return this.http.post('http://localhost:3000/send-courses', data);
  }
}
