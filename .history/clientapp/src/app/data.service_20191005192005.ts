import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  updateRolePermission(role,f )  {
    alert('in service-- ' + role);
    return this.http.post(this.baseUrl + 'updateRolePermissions/' + role, f);
  }



  constructor(private http: HttpClient) { }

  addSubject(s): any {

  }

}
