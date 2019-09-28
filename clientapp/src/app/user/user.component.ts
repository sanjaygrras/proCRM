import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { BackendService } from '../backend.service';

declare var document: any;

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
  notificationMessage;
  delUser;
  idForEdit;

  @ViewChild('notification', {static: false}) notification;

   constructor(private u: UserService, private _backend: BackendService) { }

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
      if ( d.status === 'ok') {

       this.notificationMessage = 'user created Successfully';
       this.toggleMessage( '1' );
       setTimeout(this.toggleMessage , 3000, '0');
       this.u.userget().subscribe((g) => {
          this.userArray = g.data;
        });
      }
    });
  }


  toggleMessage(o) {
    // alert('toggel called with opacity' + o);
    // this.notification.nativeElement.style.opacity = o;
    document.getElementById('notify').style.opacity = o;
  }


  deleteUser(a) {
    this.delUser = a;
    // alert(this.delUser);
    const del = {d: this.delUser};
    this.u.userdel(del).subscribe( (r) => {
      if ( r.status === 'ok') {
      
        this.notificationMessage = 'user Deleted Successfully';
        this.toggleMessage( '1' );
        setTimeout(this.toggleMessage , 3000, '0');

        this.u.userget().subscribe((g) => {
          this.userArray = g.data;
        });
      }
    });
  }

  // getting data of user in form
  edit(p)
  {
     // alert(JSON.stringify(p));
     this.idForEdit = p._id;
     this.name = p.name;
     this.email = p.email;
     this.contact = p.contact;
     this.role = p.role;
     this.pass = p.pass;
  }

  // getting edited data
  userEdit() {
    const rData = {_id: this.idForEdit, email: this.email, pass: this.pass, role: this.role, contact: this.contact,  name: this.name };
    console.log("editing in ts.........");
    console.log(rData);
    this.u.userEditPush(rData).subscribe((d) => {
      if ( d.status === 'ok') {
       this.notificationMessage = 'user edited Successfully';
       this.toggleMessage( '1' );
       setTimeout(this.toggleMessage , 3000, '0');

       // removing default data form popup form so that form will be show empty next time otherwise last edit value will be there
       this.name = '';
       this.email = '';
       this.contact = '';
       this.role = '';
       this.pass = '';

       this.u.userget().subscribe((g) => {
          this.userArray = g.data;
        });
      }
    });
  }


}
