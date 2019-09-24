import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  data;
  name: any;
  email: any;
  contact: any;
  role: any;
  pass: any;
  userArray;
  rolesArray;

  delUser;

  constructor(private u: UserService, private _backend:BackendService) { }

  ngOnInit() {
    this._backend.getroles().subscribe((d) => {
      this.rolesArray = d;
    });

    this.u.userget().subscribe((g) => {
      this.userArray = g.data;
      // console.log(this.userArray);
    });

  }

  userRegister() {
    const rData = {email: this.email, pass: this.pass, role: this.role, contact: this.contact,  name: this.name };
    console.log(rData);
    this.u.userRegisterPush(rData).subscribe((d) => {
      // console.log(d);
    });
  }

  deleteUser(a) {
    this.delUser = a;
    alert(this.delUser);
    const del = {d: this.delUser};
    this.u.userdel(del).subscribe( (r) => {
      alert('222222222222');
    });
  }


}
