import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  title;
  prerequisite;
  description;
  duration;
  fee;
  brochure= '';
  keywords= [];
  course;
  constructor(private _backend:BackendService) { }

  ngOnInit() {
    this._backend.getcourses().subscribe((p)=>{
      this.course=p;
    })
  }

  addCourse() {
    console.log(this.title);
    console.log(this.prerequisite);
    console.log(this.description);
    console.log(this.duration);
    console.log(this.fee);
    console.log(this.brochure);
    console.log(this.keywords);
    let data = { title: this.title, 
                  prerequisite: this.prerequisite,
                  description: this.description,
                  duration: this.duration,
                  fee: this.fee,
                  brochure: this.brochure,
                  keywords: this.keywords
                }

    this._backend.postcourses(data).subscribe((d)=>{
      console.log(d);
    });
  }
  
}
