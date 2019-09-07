import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  
  roles;
  roleName;
  roleDesc;
  
  constructor(private _backend:BackendService) { }

  ngOnInit() {
    this._backend.getroles().subscribe((d)=>{
      this.roles=d;
    })
    console.log(this.roles);
    console.log("init");
  }

  registerRole() {
    let data ={ roleName:this.roleName, roleDesc:this.roleDesc};
    this._backend.postroles(data).subscribe((d)=>{
      console.log(d);
    })
    console.log(this.roles);
  }

  roleDelete(i){
    this._backend.deleterole(i).subscribe((d)=>{
      console.log(d);
    })
  }

}
