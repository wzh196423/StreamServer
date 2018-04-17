var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by wangziheng on 2018/3/23.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Room } from "../entities/room";
import { Campus } from "../entities/campus";
var RoomService = /** @class */ (function () {
    function RoomService(http) {
        this.http = http;
        this.observers = [];
        this.roomList = [];
        var h = new Campus("H", "邯郸校区");
        var z = new Campus("Z", "张江校区");
        var f = new Campus("F", "枫林校区");
        var j = new Campus("J", "江湾校区");
        this.roomList.push(new Room("2101", "H"));
        this.roomList.push(new Room("2102", "Z"));
        this.roomList.push(new Room("2103", "F"));
        this.roomList.push(new Room("2104", "J"));
    }
    RoomService.prototype.updateAfterLogin = function () {
        var _this = this;
        this.roomList = [];
        this.observers = [];
        return this.updateRoomList().then(function (rooms) {
            _this.roomList = rooms;
            console.log('update RoomService success, ', _this.roomList.length);
        });
    };
    // 重新从服务器获取教室列表
    RoomService.prototype.updateRoomList = function () {
        var _this = this;
        var url = 'http://localhost:3000/room/getRooms';
        return this.http.get(url).toPromise().then(function (res) {
            if (res.json().data === 'success') {
                _this.roomList = JSON.parse(res.json().friends);
                return _this.roomList;
            }
            else {
                return _this.roomList;
                // 服务器错误
                // console.log('RoomService-updateRoomList:', res.json().data);
                // return [];
            }
        }).catch(function (error) {
            console.log(error);
            return [];
        });
    };
    RoomService.prototype.update = function () {
        this.observers.forEach(function (item) { return item.update(); });
    };
    RoomService.prototype.getRoomList = function () {
        return this.roomList;
    };
    RoomService.prototype.addRoom = function (room) {
        // let headers = new Headers({'Content-Type': 'application/json'});
        // let options = new RequestOptions({headers: headers});
        // let url = 'http://localhost:3000/room/addRoom';
        // let r = {
        //   id: room.id,
        //   campus: room.campusId,
        // };
        //
        // return this.http.post(url, JSON.stringify(r), options)
        //   .toPromise()
        //   .then((res) => {
        //     if (res.json().data === 'success') {
        //       this.roomList.push(room);
        //       this.update();
        //       return Promise.resolve('success');
        //     } else {
        //       return Promise.resolve('error');
        //     }
        //   }).catch((error) => {
        //     console.log('RoomService-addRoom', error);
        //   });
        this.roomList.push(room);
        this.update();
        return Promise.resolve('success');
    };
    RoomService.prototype.registerPage = function (page) {
        this.observers.push(page);
        //component.log('register!');
    };
    RoomService.prototype.removePage = function (page) {
        this.observers.splice(this.observers.indexOf(page), 1);
        //component.log('remove!');
    };
    RoomService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], RoomService);
    return RoomService;
}());
export { RoomService };
//# sourceMappingURL=room.service.js.map