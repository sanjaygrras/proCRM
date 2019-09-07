import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { creatingRole } from '../model/roles';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  createRole = new creatingRole;
  roleName;
  roleDesc;
  roleSubmit;
  constructor(private roles:DataService) { }

  ngOnInit() {
  }

  registerRole() {
    // this.roles.rolesRegister(this.createRole).subscribe((newRole) => {
    //     this.roleSubmit = newRole;
    // });
  }


}
