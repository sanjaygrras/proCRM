import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = "Welcome";
  constructor(private route:Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('email');
    this.route.navigate(['']);
  }
}
