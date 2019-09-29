import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionValidationService } from '../action-validation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username;
  constructor(private route: Router, private avs: ActionValidationService) { }

  ngOnInit() {
    this.avs.setRolePermission(localStorage.getItem('role'));
    this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    this.route.navigate(['']);

  }

  isAllowed(f) {
    return this.avs.checkRolePermission(f);

  }
}
