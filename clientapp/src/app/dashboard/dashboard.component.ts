import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionValidationService } from '../action-validation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Welcome';
  constructor(private route: Router, private avs: ActionValidationService) { }

  ngOnInit() {
    this.avs.setRolePermission(localStorage.getItem('role'));
  }

  logout() {
    localStorage.removeItem('email');
    this.route.navigate(['']);
  }

  isAllowed(f) {
    return this.avs.checkRolePermission(f);

  }
}
