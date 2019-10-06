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
  allTopics;
  constructor(private subjectService: DataService) { }

  ngOnInit() {
    this.subjectService.getSubject().subscribe( (g) => {
      this.allSubject = g.s;
    });

    this.subjectService.getTopics().subscribe( (t) => {
      this.allTopics = t.s;
    });
  }

  addSubject() {
    const newSubject = {title: this.title, duration: this.duration, description: this.description, brochure: this.brochure };
    this.subjectService.addSubject( newSubject ).subscribe( (s) => {
      this.subjectService.getSubject().subscribe( (g) => {
        this.allSubject = g.s;
      });
    });
  }

  deleteSubject(d) {
    this.del = d;
    const dSub = {del: this.del};
    this.subjectService.deleteingSubject(dSub).subscribe((de) => {
      this.subjectService.getSubject().subscribe( (g) => {
        this.allSubject = g.s;
      });
    });
  }

  editSubject(e) {
    this.id = e._id;
    this.title = e.title;
    this.duration = e.duration;
    this.description = e.description;
    this.brochure = e.brochure;
  }

  editUpdateSubject() {
    const subUp = {_id: this.id, title: this.title, duration: this.duration, description: this.description, brochure: this.brochure};
    this.subjectService.editingSubject(subUp).subscribe( (edit) => {

      this.emptyForm();

      this.subjectService.getSubject().subscribe( (g) => {
        this.allSubject = g.s;
      });
    });
  }

  emptyForm() {
    this.id = '';
    this.title = '';
    this.duration = '';
    this.description = '';
    this.brochure = '';
  }

  addTopics() {
    const topicinfo = {title: this.title, duration: this.duration, description: this.description};
    this.subjectService.addingTopics(topicinfo).subscribe((t) => {
      this.subjectService.getTopics().subscribe( (t) => {
        this.allTopics = t.s;
      });
    });
  }

  deleteTopic(d) {
    this.del = d;
    const dSub = {del: this.del};
    this.subjectService.deleteingTopic(dSub).subscribe((de) => {
      this.subjectService.getTopics().subscribe( (t) => {
        this.allTopics = t.s;
      });
    });
  }

  editTopic(e) {
    this.id = e._id;
    this.title = e.title;
    this.duration = e.duration;
    this.description = e.description;
  }

  editUpdateSubject() {
    const subUp = {_id: this.id, title: this.title, duration: this.duration, description: this.description, brochure: this.brochure};
    this.subjectService.editingSubject(subUp).subscribe( (edit) => {

      this.emptyForm();

      this.subjectService.getSubject().subscribe( (g) => {
        this.allSubject = g.s;
      });
    });
  }

}
