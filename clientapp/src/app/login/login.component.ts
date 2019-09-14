import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionValidationService } from '../action-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user;
  pass;
  failed;
  name;
  class;
  constructor(private rou:Router, private arou:ActivatedRoute, private admin: DataService, private avs: ActionValidationService) { }

  ngOnInit() {
  }

  getdata() {
   this.admin.check(this.user, this.pass).subscribe((adi) => {
    if (adi) {
     localStorage.setItem('email', this.user);
     localStorage.setItem('role', adi.data[0].role );
     this.avs.setRolePermission(adi.data[0].role);
     this.rou.navigate(['dashboard']);
    }  else {
      alert('Login Credentials are incorrect');
    }

   });

  }

}
