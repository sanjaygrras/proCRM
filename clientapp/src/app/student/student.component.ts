import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { stringify } from 'querystring';
import {ValidateForm } from '../validate-form';
import { StudentModel } from '../models/StudentModel';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  msg;
  sName: any;
  sEmail;
  sMobile;
  sRequest;
  getLead;
  registeredStudents;
  id;
  fResult;
  nDate;
  followupTitle;
  followupId;
  leadSource;
  leadId;
  courses;
  sCourse;
  sAddress;
  picture = '';
  sPhoto;
  sPhotoExt;
  oldsPhotoExt;
  title;
  tDate = new Date();
  courseName;
  leadStatus;
  status = 'active';
  message: any;
  regStudent: any = {};
  stFrom: StudentModel = new StudentModel();

  onSubmit(a) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(a));
  }

  constructor(private studentService: BackendService) { }

  ngOnInit() {
    this.studentService.getcourse().subscribe((p) => {
      this.courses = p.docs;
    });
    this.listLead();
    this.listStudent();
  }

  listLead() {
    this.studentService.getLead().subscribe( (g) => {
      this.getLead = g.data;
    });
  }

  listStudent() {
    this.studentService.registeredStudents().subscribe( (g) => {
      this.registeredStudents = g.data;
    });
  }

  dateFormat() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if ( dd < 10) {
        dd = '0' + dd;
    }

    if ( mm < 10) {
        mm = '0' + mm;
    }
    // today = mm + '-' + dd + '-' + yyyy;
    today = mm + '/' + dd + '/' + yyyy;
    // today = dd + '-' + mm + '-' + yyyy;

    return today;
  }

  studentQuery() {
    const sQuery = {sName: this.sName, sEmail: this.sEmail, sMobile: this.sMobile, sRequest: this.sRequest, followup: [], status: 'active',
                    currentDate: new Date() };
    this.studentService.addQuery( sQuery ).subscribe( (s) => {
      if (s.status === 'ok') {
          this.msg = s.msg;
      }
    });
  }

  leadProcess(l) {
    this.id = l._id;
    this.sName = l.sName;
    this.sEmail = l.sEmail;
    this.sMobile = l.sMobile;
    this.sRequest = l.sRequest;
  }

  updateLead() {
    const updateLead = {followupId: this.id, fResult: this.fResult, nDate: this.nDate, followupTitle: this.followupTitle, 
                        currentDate: new Date()  };
    this.studentService.followupStudent( updateLead ).subscribe((f) => {
      this.listLead();
    });
  }

  getTargetId(id) {
    return '#a' + id;
  }

  leadAsStudent(l) {
    this.id = l._id;
    this.sName = l.sName;
    this.sEmail = l.sEmail;
    this.sMobile = l.sMobile;
    this.sRequest = l.sRequest;
    this.status = l.status;
  }

  registerStudent() {
    const fData = new FormData();
    fData.set('sName', this.stFrom.sName);
    fData.set('sMobile', this.sMobile);
    fData.set('sEmail', this.sEmail);
    fData.set('sRequest', this.sRequest);
    fData.set('sCourse', this.sCourse);
    fData.set('sAddress', this.sAddress);
    fData.set('sPhoto', this.sPhoto);
    fData.set('leadId', this.id);
    // fData.set('sPhotoExt', 'this.sPhotoExt');

    // this.studentService.registerStudentPush( fData ).subscribe( (s) => {
    //   this.listLead();
    //   this.listStudent();
    // });
  }

  getFile(f) {
    this.sPhoto = f.target.files[0];
  }

  editStudent(data) {
    // console.log("raviknat checking " + JSON.stringify(data));
    this.id = data._id;
    this.sName = data.sName;
    this.sMobile = data.sMobile;
    this.sEmail = data.sEmail;
    this.sRequest = data.sRequest;
    this.sCourse = data.sCourse;
    this.sAddress = data.sAddress;
    this.sPhoto = data.sPhotoExt;
    // this.courseName = data.courseName[0].title;
  }

  editStudentUpdate() {
    const fData = new FormData();
    fData.set('_id', this.id);
    fData.set('sName', this.sName);
    fData.set('sMobile', this.sMobile);
    fData.set('sEmail', this.sEmail);
    fData.set('sRequest', this.sRequest);
    fData.set('sCourse', this.sCourse);
    fData.set('sAddress', this.sAddress);
    fData.set('sPhoto', this.sPhoto);
    fData.set('oldsPhotoExt', this.sPhotoExt);

    this.studentService.editStudentUpdatePush( fData ).subscribe( (s) => {
      this.listLead();
    });
  }

}
