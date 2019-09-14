import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionValidationService {

   loggedInUserPermissions;

  constructor(private http: HttpClient) {

   }

  checkRolePermission( actionTitle: string ) {

    let isAllowed = false;
    if (localStorage.getItem('role') === 'Admin') {
      isAllowed = true;
    } else if (this.loggedInUserPermissions.length === 0) {
        return false;

    }    else {

      isAllowed = this.loggedInUserPermissions[actionTitle];

  }
    console.log( 'checking for' + actionTitle + 'for the role' + localStorage.getItem('role') + 'result- ' + isAllowed);
    return isAllowed;

  }

  setRolePermission(role) {
    this.http.get<[]>('http://localhost:3000/getPermisions/' + role).subscribe((d) => {
     this.loggedInUserPermissions = d;
    });
  }
}


