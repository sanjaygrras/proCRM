import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  msg;
  sName;
  sEmail;
  sMobile;
  sRequest;
  getLead;
  constructor(private studentService: BackendService) { }

  ngOnInit() {
    this.studentService.getLead().subscribe( (g) => {
      // this.getLead = g.s;
    });
  }

  studentQuery() {
    const sQuery = {sName: this.sName, sEmail: this.sEmail, sMobile: this.sMobile, sRequest: this.sRequest };
    this.studentService.addQuery( sQuery ).subscribe( (s) => {
      if (s.status === 'ok') {
          this.msg = s.msg;
      }
    });
  }

  

}
