import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionValidationService {

   loggedInUserPermissions: [ ];

  constructor(private http: HttpClient) {
        this.setRolePermission(localStorage.getItem('role'));
   }

  checkRolePermission( actionTitle: string ) {

    if (localStorage.getItem('role') === 'Admin') {
      return true;
    } else if (this.loggedInUserPermissions.length === 0) {
        return true;

    }    else {

    //   let isAllowed = false;
    //   this.loggedInUserPermissions.forEach((element) => {
    //     if (element.action_title === actionTitle) {
    //         isAllowed = element.isAllowed;
    //     }
    // });
      return true;

  }

  }

  setRolePermission(role) {
    this.http.get<[]>('http://localhost:3000/getPermisions/' + role).subscribe((d) => {
     this.loggedInUserPermissions = d;
    });
  }
}


