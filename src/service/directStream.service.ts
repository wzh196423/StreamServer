/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {DirectStream} from "../entities/directStream";
import {LiveRoom} from "../entities/liveRoom";
import {LiveServer} from "../entities/liveServer";
import {Camera} from "../entities/camera";

@Injectable()
export class DirectStreamService{
  directStreamList : DirectStream[];
  observers: any[];

  constructor(public http: Http) {
    this.directStreamList = [];
    this.observers = [];
  }

  updateAfterLogin() {
    this.observers = [];
    //this.campusList = [];

    return this.updateDirectStreamList().then(directStreams => {
      this.directStreamList = directStreams;
      console.log('update DirectStreamService success, ', this.directStreamList.length);
    });
  }

  // 重新从服务器获取直推流列表
  updateDirectStreamList() {
    let url = 'http://localhost:3000/directStream/getDirectStreams';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.directStreamList = JSON.parse(res.json().friends);
        return this.directStreamList;
      } else {
        console.log('DirectStreamService-updateDirectStreamList:', res.json().data);
        return [];
      }
    }).catch(error => {
      return this.directStreamList;
      // TODO:
      // console.log(error);
      // return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getDirectStreamList() {
    return this.directStreamList;
  }
  addDirectStream(directStream : DirectStream) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/directStream/addDirectStream';
    let c = {
      liveServerId: directStream.liveServerId,
      url: directStream.url,
      liveRoomId: directStream.liveRoomId,
      status: directStream.status
    };

    return this.http.post(url, JSON.stringify(c), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          this.directStreamList.push(directStream);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('DirectStreamService-addDirectStream', error);
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

  getDirectStreamByLiveRoom(liveRoom:LiveRoom){
    return this.directStreamList.find(item => {
      return item.liveRoomId == liveRoom.id;
    })
  }

  getDirectStreamById(id:number){
    return this.directStreamList.find(item => {
      return item.id == id;
    });
  }

  getDirectStreamsByLiveServer(liveServer:LiveServer){
    return this.directStreamList.filter(item => {
      return item.liveServerId == liveServer.id;
    });
  }

  getDirectStreamByCamera(camera:Camera){
    return this.directStreamList.find(item => {
      return item.id == camera.directStreamId;
    });
  }
}
