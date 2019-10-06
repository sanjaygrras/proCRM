import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  title: any;
  duration: any;
  description: any;
  brochure: any;
  constructor(private subjectService: DataService) { }

  ngOnInit() {
  }

  addSubject() {

  }

}
