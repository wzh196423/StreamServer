/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {School} from "../entities/school";
import {RootServer} from "../entities/rootServer";

@Injectable()
export class SchoolService{
  schoolList : School[];
  observers: any[];

  constructor(public http: Http) {
    this.observers = [];
    this.schoolList = [];
  }

  updateAfterLogin() {
    this.schoolList = [];
    this.observers = [];

    return this.updateSchoolList().then(schools => {
      this.schoolList = schools;
      console.log('update RoomService success, ', this.schoolList.length);
    });
  }

  // 重新从服务器获取教室列表
  updateSchoolList() {
    let url = 'http://localhost:3000/school/getSchools';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.schoolList = JSON.parse(res.json().schools);
        return this.schoolList;
      } else {
        // 服务器错误
        console.log('SchoolService-updateSchoolList:', res.json().data);
        return [];
      }
    }).catch(error => {
      console.log(error);
      return [];
    });
  }

  getSchoolList() {
    return this.schoolList;
  }
  addSchool(school : School) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/school/addSchool';
    let r = {
      name: school.name,
    };

    return this.http.post(url, JSON.stringify(r), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          school.id = res.json().id;
          this.schoolList.push(school);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('SchoolService-addSchool', error);
        return Promise.resolve('error');
      });
  }
  deleteSchool(school : School) {
    let url = 'http://localhost:3000/school/deleteSchool?id='+school.id;
    return this.http.delete(url)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          this.schoolList.splice(this.schoolList.indexOf(school),1);
          console.log(school);
          this.update();
          return Promise.resolve('success');
        } else if (res.json().data == 'ForeignKeyConstraintError'){
          return Promise.resolve('constraintError');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('SchoolService-deleteSchool', error);
        return Promise.resolve('error');
      });
  }
  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getSchoolById(id:number){
    return this.schoolList.find(item => {
      return item.id == id;
    })
  }
}
