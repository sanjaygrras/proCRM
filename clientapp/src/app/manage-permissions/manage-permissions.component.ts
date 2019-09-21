import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { ActionValidationService } from '../action-validation.service';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.css']
})
export class ManagePermissionsComponent implements OnInit {

  test = false;
  allFeatures;
  f = {};

  role: string;
  constructor(private ds: DataService, private route: ActivatedRoute, private vs: ActionValidationService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((d) => {
      this.role = d.get('role');
       // the following method call will fetch all features of crm and then prepare a json object
       // having keys corresponding to each feature and value is assigned on behalf of permission 
       // to the user for that perticuler feature. permission will be verfied by ActionValidation Service. 
      this.vs.setTempRolePermission(this.role);
      this.ds.getCRMFeatures().subscribe((d) => {
        this.allFeatures = d.data;
        this.allFeatures.forEach((ele) => {
          this.f[ele.action_title] = this.vs.checkPermissionToManageRole(ele.action_title, this.role);

          ele.sub_options.forEach((el) => {
            
            // this will add a key for subfeature along with it's permission. that is also fetched
            // from ActionValidation Service.
            this.f[el.action_title] = this.vs.checkPermissionToManageRole(el.action_title, this.role);
          });

        });

        console.log("temp user features are ......................");
        console.log(this.f);

      });
    });
  }

  check() {
    alert("in check");
    this.ds.updateRolePermission(this.role, this.f).subscribe((d)=>{
      alert(JSON.stringify(d));
    })
  }

}
