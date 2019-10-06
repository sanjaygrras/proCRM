import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:3000/';

  check( email, pass): any {
    return this.http.post( this.baseUrl + 'login', { email: email, pass: pass});
  }

  register(f) {
    return this.http.post(this.baseUrl + 'registerUser', f);
  }

  createRole(f)  {
return this.http.post(this.baseUrl + 'createRole', f);
  }

  getCRMFeatures(): any  {
    return this.http.get(this.baseUrl + 'getAllFeatures');
  }

  updateRolePermission(role, f )  {
    return this.http.post(this.baseUrl + 'updateRolePermissions/' + role, f);
  }



  constructor(private http: HttpClient) { }

  addSubject(s): any {
    return this.http.post(this.baseUrl + 'add-subject', s);
  }

  getSubject(): any {
    return this.http.get(this.baseUrl + 'get-subject');
  }

  deleteingSubject(data): any {
    return this.http.post(this.baseUrl + 'delete-subject', data);
  }

  editingSubject(e): any {
    return this.http.post(this.baseUrl + 'edit-subject', e);
  }

  addingTopics(a): any {
    return this.http.post(this.baseUrl + 'add-topic', a);
  }

  getTopics(): any {
    return this.http.get(this.baseUrl + 'get-topics');
  }

  deleteingTopic(data): any {
    return this.http.post(this.baseUrl + 'delete-topic', data);
  }

  editingTopic(e): any {
    return this.http.post(this.baseUrl + 'edit-subject', e);
  }

}
