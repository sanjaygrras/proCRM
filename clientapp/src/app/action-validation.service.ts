import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class ActionValidationService {

   loggedInUserPermissions;
   tempUserPermission;

  constructor(private http: HttpClient, private ds: DataService) {

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
    return isAllowed;
  }






  setRolePermission(role) {
    this.http.get<any>('http://localhost:3000/getPermisions/' + role).subscribe((d) => {

      this.loggedInUserPermissions = d.data[0].permissions;
    });
  }

   setTempRolePermission(role) {





return new Promise((resolve, reject) => {



    console.log('setting temp role permission');
    let f = {};
    let allFeatures;
    this.http.get<any>('http://localhost:3000/getPermisions/' + role).subscribe((d) => {

    this.tempUserPermission = d.data[0].permissions;




    this.ds.getCRMFeatures().subscribe(( d ) => {
      allFeatures = d.data;
      allFeatures.forEach((ele) => {
        f[ele.action_title] = this.checkPermissionToManageRole(ele.action_title, role);

        ele.sub_options.forEach((el) => {

          // this will add a key for subfeature along with it's permission. that is also fetched
          // from ActionValidation Service.
          f[el.action_title] = this.checkPermissionToManageRole(el.action_title, role);
        });

      });

      resolve({f:f, allFeatures:allFeatures});

    });





    });




  }); // promise callback body finish
  }
}


