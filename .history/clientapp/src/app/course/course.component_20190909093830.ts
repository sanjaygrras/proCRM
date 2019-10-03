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
    this._backend.getcourse().subscribe((p)=>{
      this.course=p;
    })
  }

  addCourse() {
  
    let data = { title: this.title, 
                  prerequisite: this.prerequisite,
                  description: this.description,
                  duration: this.duration,
                  fee: this.fee,
                  brochure: this.brochure,
                  keywords: this.keywords
                };

    this._backend.postcourse(data).subscribe((d)=>{
      console.log(d);
    });
  }
  
  deleteCourse(i){
    console.log(i);
    this._backend.deletecourse({'id': i}).subscribe((d)=>{
      console.log(d);
    })
  }

}
