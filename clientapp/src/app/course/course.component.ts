import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { stringify } from 'querystring';
import { element } from 'protractor';

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
  id;
  brochure = '';
  brochureImage;
  brochureExt;
  keywords = [];
  courses;
  course;
  Subjects = [];
  allSubject;
  subjectName: any;
  subjectId;
  coursesName: any;
  courseId;
  del;
  constructor(private backend: BackendService, private subjectService: DataService) { }

  ngOnInit() {
    this.backend.getcourse().subscribe((p) => {
      this.courses = p.docs;
    });
    this.subjectService.getSubject().subscribe( (g) => {
      this.allSubject = g.s;
    });
  }

  addCourse() {
    const fData = new FormData();
    fData.set('title', this.title);
    fData.set('brochureImage', this.brochureImage);
    fData.set('prerequisite', this.prerequisite);
    fData.set('description', this.description);
    fData.set('fee', this.fee);
    fData.set('keywords', this.keywords.toString());
    // fData.set('Subjects', this.Subjects.toString());

    this.backend.postcourse(fData).subscribe((d) => {
      this.backend.getcourse().subscribe((p) => {
        this.courses = p.docs;
      });
    });
  }

  editCourse(e) {
    this.title = e.title;
    this.prerequisite = e.prerequisite;
    this.description = e.description;
    this.duration = e.duration;
    this.fee = e.fee;
    this.keywords = e.keywords;
    this.brochureExt = e.brochureExt;
    this.id = e._id;
  }

  editCourseUpdate() {
    const fData = new FormData();
    fData.set('title', this.title);
    fData.set('_id', this.id);
    fData.set('brochureImage', this.brochureImage);
    fData.set('oldBrochureExt', this.brochureExt);
    fData.set('prerequisite', this.prerequisite);
    fData.set('description', this.description);
    fData.set('fee', this.fee);
    fData.set('keywords', this.keywords.toString());

    this.backend.postEditcourse(fData).subscribe((d) => {
      this.backend.getcourse().subscribe((p) => {
        this.courses = p.docs;
      });
    });
  }

  deleteCourse(i) {
    this.backend.deletecourse({id: i}).subscribe((d) => {
      this.backend.getcourse().subscribe((p) => {
        this.courses = p.docs;
      });
    });
  }

  SubjectAdd() {

    const cAdd = {
        courseId: this.courseId,
        subjectId: this.subjectId,
      };

    // checking that new subject is already added or not.
    const currentCourse = this.courses.filter((ele) => {
      if (ele._id === this.courseId) {
        return true;
      }
    });

    // console.log('selected course ID ' + JSON.stringify(currentCourse) );

    const isExist = currentCourse[0].subject_Details.some((ele) => {
      if ( ele === this.subjectId) { return true; }
    });

    if (isExist)  {
         alert('Subject Already Exist');
    } else  {
      this.backend.subjectInCourse(cAdd).subscribe( (s) => {
        this.backend.getcourse().subscribe((p) => {
          this.courses = p.docs;
        });
      });
    }


  }

  getFile(f) {
    this.brochureImage = f.target.files[0];
  }

  getTargetId(id) {
    return '#a' + id;
  }

  deleteCourseSubject(d, b) {
    const dSub = {subjectId: d, courseId: b };
    this.backend.subjectInCourseDel(dSub).subscribe( (d) => {
      if ( d.status === 'ok') {
        // console.log(' Deleted successfully ');
        this.backend.getcourse().subscribe((p) => {
          this.courses = p.docs;
        });
      }
    });
  }

}

