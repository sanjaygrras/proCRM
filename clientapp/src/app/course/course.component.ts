import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';

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
  allSubject;
  subjectId;
  courseList;
  constructor(private backend: BackendService, private subjectService: DataService) { }

  ngOnInit() {
    this.backend.getcourse().subscribe((p) => {
      this.course = p;
    });
    this.subjectService.getSubject().subscribe( (g) => {
      this.allSubject = g.s;
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

  getCourse

}
