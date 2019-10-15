import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { stringify } from 'querystring';

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
  courses;
  course;
  allSubject;
  subjectName: any;
  subjectId;
  coursesName: any;
  courseId;
  constructor(private backend: BackendService, private subjectService: DataService) { }

  ngOnInit() {
    this.backend.getcourse().subscribe((p) => {
      this.courses = p;
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
    this.backend.deletecourse({id: i}).subscribe((d) => {
      this.backend.getcourse().subscribe((p) => {
        this.courses = p;
      });
    });
  }

  SubjectAdd() {
    const cAdd = {
        courseId: this.courseId,
        subjectId: this.subjectId,
      };

    //alert(stringify(cAdd));

    this.backend.subjectInCourse(cAdd).subscribe( (s) => {
      console.log( ' Successfully updated' );
    });
  }

}
