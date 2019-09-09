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
  successInserted;
  constructor(private _backend:BackendService) { }

  ngOnInit() {

  }

  refresh(){
    this._backend.getroles().subscribe((d)=>{
      this.roles=d;
      console.log(d);
    })
    console.log(this.roles);
  }

  registerRole() {
    let data ={ roleName:this.roleName, roleDesc:this.roleDesc};
    this._backend.postroles(data).subscribe((d) => {
      console.log(d);
      if(d.status == "ok") {
        //this.successInserted = "New role successfully inserted";
        alert("Successfully inserted");
      }
    });
    console.log(this.roles);
  }

  roleDelete(i){
    console.log(i);
    this._backend.deleterole({'id': i}).subscribe((d)=>{
      console.log(d);
    })
  }

}
