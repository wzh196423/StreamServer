/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Campus} from "../entities/campus";
import {Camera} from "../entities/camera";

@Injectable()
export class CampusService{
  campusList : Campus[];
  observers: any[];

  constructor(public http: Http) {
    this.campusList = [];
    // this.campusList.push(new Campus("邯郸校区",1,1));
    // this.campusList.push(new Campus("张江校区",1,2));
    // this.campusList.push(new Campus("枫林校区",1,3));
    // this.campusList.push(new Campus("江湾校区",1,4));
    this.observers = [];
  }

  updateAfterLogin() {
    this.observers = [];
    //this.campusList = [];

    return this.updateCampusList().then(campuses => {
      this.campusList = campuses;
      console.log('update CampusService success, ', this.campusList.length);
    });
  }

  // 重新从服务器获取校区列表
  updateCampusList() {
    let url = 'http://localhost:3000/campus/getCampuses';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.campusList = JSON.parse(res.json().campuses);
        return this.campusList;
      } else {
        console.log('CampusService-updateCampusList:', res.json().data);
        return [];
      }
    }).catch(error => {
      console.log(error);
      return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getCampusList() {
    return this.campusList;
  }
  addCampus(campus : Campus) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/campus/addCampus';
    let c = {
      name: campus.name,
      schoolId: campus.schoolId,
    };

    return this.http.post(url, JSON.stringify(c), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          campus.id = res.json().id;
          this.campusList.push(campus);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('CampusService-addCampus', error);
        return Promise.resolve('error');
      });

  }
  deleteCampus(campus:Campus){
    let url = 'http://localhost:3000/campus/deleteCampus?id='+campus.id;
    return this.http.delete(url)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          this.campusList.splice(this.campusList.indexOf(campus),1);
          console.log(campus);
          this.update();
          return Promise.resolve('success');
        } else if (res.json().data == 'ForeignKeyConstraintError'){
          return Promise.resolve('constraintError');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('CampusService-deleteCampus', error);
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
}
