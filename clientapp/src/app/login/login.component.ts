import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private rou:Router, private arou:ActivatedRoute, private admin:DataService) { }

  ngOnInit() {
  }

  getdata() {
    var adi = this.admin.check(this.user, this.pass);

    if(adi)
    {
     localStorage.setItem('email', this.user);
     this.rou.navigate(['dashboard']);
    }
    else
    {
      this.rou.navigate(['']);
      this.failed = "Login details are wrong";
    }

  }

}
