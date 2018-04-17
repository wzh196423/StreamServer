/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {LiveRoom} from "../entities/liveRoom";
import {Channel} from "../entities/channel";

@Injectable()
export class LiveRoomService{
  liveRoomList : LiveRoom[];
  observers: any[];

  constructor(public http: Http) {
    this.liveRoomList = [];
    this.liveRoomList.push(new LiveRoom('化学与人类','有意思的化学与人类课程',1,0,'wzx',1));
    this.liveRoomList.push(new LiveRoom('改变生活的化学元素','化学如何改变生活',1,0,'www',2));
    this.liveRoomList.push(new LiveRoom('普化实验','动动手一起来',1,0,'2222',3));
    this.liveRoomList.push(new LiveRoom('无机化学','无机化学课程，相对于有机',1,0,'hhhhh',4));


    this.liveRoomList.push(new LiveRoom('物理实验','动手了解物理世界',2,0,'wuli',5));
    this.liveRoomList.push(new LiveRoom('大学物理','基础的物理课程，人人都要学',2,0,'woai',6));

    this.observers = [];
  }

  updateAfterLogin() {
    this.observers = [];
    //this.campusList = [];

    return this.updateLiveRoomList().then(liveRooms => {
      this.liveRoomList = liveRooms;
      console.log('update LiveRoomService success, ', this.liveRoomList.length);
    });
  }

  // 重新从服务器获取频道列表
  updateLiveRoomList() {
    let url = 'http://localhost:3000/liveRoom/getLiveRooms';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.liveRoomList = JSON.parse(res.json().liveRooms);
        return this.liveRoomList;
      } else {
        console.log('LiveRoomService-重新从服务器获取频道列表:', res.json().data);
        return [];
      }
    }).catch(error => {
      return this.liveRoomList;
      // TODO:
      // console.log(error);
      // return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getLiveRoomList() {
    return this.liveRoomList;
  }

  addLiveRoom(liveRoom : LiveRoom) {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // let url = 'http://localhost:3000/liveRoom/addLiveRoom';
    // let c = {
    //   title : liveRoom.title,
    //   description : liveRoom.description,
    //   channelId : liveRoom.channelId,
    //   watchingNumber : liveRoom.watchingNumber,
    //   teacherName: liveRoom.teacherName,
    //   id: liveRoom.id
    // };
    //
    // return this.http.post(url, JSON.stringify(c), options)
    //   .toPromise()
    //   .then((res) => {
    //     if (res.json().data === 'success') {
    //       this.liveRoomList.push(liveRoom);
    //       this.update();
    //       return Promise.resolve('success');
    //     } else {
    //       return Promise.resolve('error');
    //     }
    //   }).catch((error) => {
    //     console.log('LiveRoomService-addLiveRoom', error);
    //   });
    this.liveRoomList.push(liveRoom);
    this.update();
    console.log(this.liveRoomList.length);
    return Promise.resolve('success');

  }
  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }

  getLiveRoomByChannel(channel:Channel){
    return this.liveRoomList.filter(item => {
      return item.channelId == channel.id;
    })
  }
}
