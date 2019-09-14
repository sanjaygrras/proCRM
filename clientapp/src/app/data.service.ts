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

  getCRMFeatures():any  {
    return this.http.get(this.baseUrl + 'getAllFeatures');
  }

  updateRolePermission(f, role)  {
    return this.http.post(this.baseUrl + 'updateRolePermission/' + role, f);
  }



  constructor(private http:HttpClient) { }

  // Roles Section Start
  rolesRegister():any {

  }
  // Roles Section end


}
