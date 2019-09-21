import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActionValidationService } from '../action-validation.service';

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

  constructor(private backend: BackendService, private avs: ActionValidationService) { }


  ngOnInit() {
     this.backend.getroles().subscribe((data) => {
       this.roles = data;
     });
  }

  refresh() {
    this.backend.getroles().subscribe((d) => {
      this.roles = d;
      console.log(d);
    });
    console.log(this.roles);
  }

  registerRole() {
    const data = { role: this.roleName, desc: this.roleDesc};
    this.backend.postroles(data).subscribe((d) => {
      console.log(d);
      if (d.status === 'ok') {
       this.refresh();
      }
    });


  }

  roleDelete(i) {
    console.log(i);
    this.backend.deleterole( { id: i} ).subscribe( (d) => {
      console.log(d);
    });
  }

  isAllowed(f) {
    return this.avs.checkRolePermission(f);

  }

}
