import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  administrator = [
    {email:"rk@gmail.com", pass:"123"},
  ]

  check( email, pass)
  {
     return this.administrator.some((u)=>{
        if(u.email===email && u.pass==pass ){
          return true;
        }
        else {
          return false;
        }
     })
  }

  
  constructor(private all:HttpClient) { }

  // Roles Section Start
  rolesRegister():any {

  }
  // Roles Section end


}
