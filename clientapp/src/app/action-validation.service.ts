import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPromiseAlike } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ActionValidationService {

   loggedInUserPermissions;
   tempUserPermission;

  constructor(private http: HttpClient) {

   }

  checkRolePermission( actionTitle: string ) {

    let isAllowed = false;
    const role = localStorage.getItem('role');

    if (role === 'Admin') {
      isAllowed = true;
    } else if (this.loggedInUserPermissions.length === 0) {

        return false;

    }    else {

      isAllowed = this.loggedInUserPermissions[actionTitle];

  }
    console.log( 'checking for' + actionTitle + 'for the role' + role + 'result- ' + isAllowed);
    return isAllowed;

  }



  checkPermissionToManageRole( actionTitle: string, role: string): boolean {


    let isAllowed = false;

    if (role === 'Admin') {
        isAllowed = true;
      } else if (this.tempUserPermission === undefined) {
          return false;
      }    else {

        isAllowed = this.tempUserPermission[actionTitle];
    }
      // console.log( 'FPR TEMP USER checking for' + actionTitle + 'for the role' + role + 'result- ' + isAllowed);

      return isAllowed;


    

  }






  setRolePermission(role) {
    this.http.get<any>('http://localhost:3000/getPermisions/' + role).subscribe((d) => {

      this.loggedInUserPermissions = d.data[0].permissions;
    });
  }

  setTempRolePermission(role) {
    this.http.get<any>('http://localhost:3000/getPermisions/' + role).subscribe((d) => {

      this.tempUserPermission = d.data[0].permissions;
    });
  }
}


