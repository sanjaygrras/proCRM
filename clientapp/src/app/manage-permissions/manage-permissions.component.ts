import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private ds: DataService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((d)=>{
this.role = d.get('role');

    });



    this.ds.getCRMFeatures().subscribe((d) => {
      alert('in line 21');
      alert(JSON.stringify(d.data));
      this.allFeatures = d.data;
      this.allFeatures.forEach((ele) => {
        this.f[ele.action_title] = false;
        ele.sub_options.forEach((el) => {
          this.f[el.action_title] = false;
        });
    });


    });
    alert(JSON.stringify(this.f));
  }

  check() {
    alert("in check");
    
    this.ds.updateRolePermission(this.role, this.f).subscribe((d)=>{
      alert(JSON.stringify(d));
    })
  }

}
