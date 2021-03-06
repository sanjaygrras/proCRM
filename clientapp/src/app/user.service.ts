import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private imp: HttpClient) { }

  userRegisterPush(data): any {
    // console.log('Service Hit');
    return this.imp.post('http://localhost:3000/user-register', data);
  }

  userget(): any {
    return this.imp.get('http://localhost:3000/user-get');
  }

  userdel(data): any {
    // alert(' delete in service ');
    return this.imp.post('http://localhost:3000/user-del', data);
  }

  userEditPush(data): any {
    return this.imp.post('http://localhost:3000/user-edit', data);
  }

}
