import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { stringify } from 'querystring';

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
  allSubject;
  del;
  id;
  constructor(private subjectService: DataService) { }

  ngOnInit() {
    this.subjectService.getSubject().subscribe( (g) => {
      this.allSubject = g.s;
    });
  }

  addSubject() {
    const newSubject = {title: this.title, duration: this.duration, description: this.description, brochure: this.brochure };
    this.subjectService.addSubject( newSubject ).subscribe( (s) => {
      alert(' sub ');
    });
  }

  deleteSubject(d) {
    this.del = d;
    const dSub = {del: this.del};
    // console.log(d + ' asfds ');
    this.subjectService.deleteingSubject(dSub).subscribe((de) => {
      console.log('asdf');
    });
  }

  editSubject(e) {
    this.id = e._id;
    this.title = e.title;
    this.duration = e.duration;
    this.description = e.description;
    this.brochure = e.brochure;
  }

  editUpdate() {
    const subUp = {title: this.title, duration: this.duration, description: this.description, brochure: this.brochure}
    this.subjectService.editingSubject(subUp).subscribe( (edit) => {
      //console.log("edited");
    });
  }

  addTopics(a): any {
    
  }

}
