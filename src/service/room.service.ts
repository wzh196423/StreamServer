/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Room} from "../entities/room";
import {Campus} from "../entities/campus";
import {LiveServer} from "../entities/liveServer";

@Injectable()
export class RoomService{
  roomList : Room[];
  observers: any[];

  constructor(public http: Http) {
    this.observers = [];
    this.roomList = [];
    // this.roomList.push(new Room("2101",1,1));
    // this.roomList.push(new Room("2102",2,2));
    // this.roomList.push(new Room("2103",3,3));
    // this.roomList.push(new Room("2104",4,4));
  }

  updateAfterLogin() {
    this.roomList = [];
    this.observers = [];

    return this.updateRoomList().then(rooms => {
      this.roomList = rooms;
      console.log('update RoomService success, ', this.roomList.length);
    });
  }

  // 重新从服务器获取教室列表
  updateRoomList() {
    let url = 'http://localhost:3000/room/getRooms';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.roomList = JSON.parse(res.json().rooms);
        return this.roomList;
      } else {
        // 服务器错误
        console.log('RoomService-updateRoomList:', res.json().data);
        return [];
      }
    }).catch(error => {
      console.log(error);
      return [];
    });
  }

  getRoomList() {
    return this.roomList;
  }
  addRoom(room : Room) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/room/addRoom';
    let r = {
      name: room.name,
      campusId: room.campusId,
    };

    return this.http.post(url, JSON.stringify(r), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          room.id = res.json().id;
          this.roomList.push(room);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('RoomService-addRoom', error);
        return Promise.resolve('error');
      });

  }
  deleteRoom(room : Room) {
    let url = 'http://localhost:3000/room/deleteRoom?id='+room.id;
    return this.http.delete(url)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          this.roomList.splice(this.roomList.indexOf(room),1);
          console.log(room);
          this.update();
          return Promise.resolve('success');
        } else if (res.json().data == 'ForeignKeyConstraintError'){
          return Promise.resolve('constraintError');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('RoomService-deleteRoom', error);
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
}
