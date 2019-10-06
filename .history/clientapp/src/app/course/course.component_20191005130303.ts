import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  title;
  name;
  prerequisite;
  description;
  duration;
  fee;
  brochure = '';
  keywords = [];
  course;
  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getcourse().subscribe((p) => {
      this.course = p;
    });
  }

  addCourse() {
    const data = { title: this.title,
                  prerequisite: this.prerequisite,
                  description: this.description,
                  duration: this.duration,
                  fee: this.fee,
                  brochure: this.brochure,
                  keywords: this.keywords
                };

    this.backend.postcourse(data).subscribe((d) => {
      // console.log(data);
    });
  }

  deleteCourse(i) {
    console.log(i);
    this.backend.deletecourse({' id ': i}).subscribe((d) => {
      // console.log(d);
      this.backend.getcourse().subscribe((p) => {
        this.course = p;
      });
    });
  }

  addTopics(t) {
    this.backend.addTopic( t ).subscribe((a) => {
      alert(" afds ");
    })
  }

}
