var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from "../entities/user";
import { SocketService } from './socket.service';
import { LocalUserService } from './local-user.service';
import { CameraService } from "./camera.service";
import { CampusService } from "./campus.service";
import { RoomService } from "./room.service";
var SignupLoginService = /** @class */ (function () {
    function SignupLoginService(http, localUserService, socketService, cameraService, campusService, roomService) {
        this.http = http;
        this.localUserService = localUserService;
        this.socketService = socketService;
        this.cameraService = cameraService;
        this.campusService = campusService;
        this.roomService = roomService;
    }
    SignupLoginService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var url = 'http://120.25.238.161:3000/user/login';
        var info = {
            username: username,
            password: password,
        };
        return this.http.post(url, JSON.stringify(info), options)
            .toPromise()
            .then(function (res) {
            if (res.json().data === 'success') {
                var infoGet_1 = JSON.parse(res.json().user);
                var user_1 = new User(infoGet_1.username, infoGet_1.nickname);
                return _this.socketService.socketConnect().then(function (data) {
                    if (data === 'success') {
                        return _this.socketService.emitPromise('login', infoGet_1.username).then(function (data) {
                            if (data === 'success') {
                                // 更新所有service的变量
                                var updateAll = [
                                    _this.localUserService.setLocalUser(user_1),
                                    _this.roomService.updateAfterLogin(),
                                    _this.campusService.updateAfterLogin(),
                                    _this.cameraService.updateAfterLogin(),
                                ];
                                return Promise.all(updateAll).then(function (data) {
                                    console.log('update all services success');
                                    return Promise.resolve("aaa");
                                });
                            }
                            return Promise.resolve('SignupLoginService-login-error');
                        }).catch(function (error) {
                            console.log('SignupLoginService-login:', error);
                            return Promise.resolve('SignupLoginService-login-error');
                        });
                    }
                    else {
                        return Promise.resolve('SignupLoginService-login-error');
                    }
                });
            }
            else {
                return Promise.resolve('error');
            }
        }).catch(function (error) {
            console.log('SignupLoginService-login', error);
            return Promise.resolve('error');
        });
    };
    SignupLoginService.prototype.signup = function (username, password, nickname) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var url = 'http://120.25.238.161:3000/user/addUser';
        var user = {
            username: username,
            password: password,
            nickname: nickname,
        };
        return this.http.post(url, JSON.stringify(user), options)
            .toPromise()
            .then(function (res) {
            if (res.json().data === 'success') {
                return Promise.resolve('success');
            }
            else {
                return Promise.resolve('error');
            }
        }).catch(function (error) {
            console.log('SignupLoginService-signup', error);
        });
    };
    SignupLoginService.prototype.changePassword = function (username, oldPsw, newPsw) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var url = 'http://120.25.238.161:3000/user/modifyPassword';
        var info = {
            username: username,
            oldPassword: oldPsw,
            newPassword: newPsw
        };
        return this.http.put(url, JSON.stringify(info), options)
            .toPromise()
            .then(function (res) {
            if (typeof res.json().data === 'string') {
                return Promise.resolve(res.json().data);
            }
            return Promise.resolve('error');
        }).catch(function (error) {
            console.log('SignupLoginService-changePassword', error);
            return Promise.resolve('error');
        });
    };
    SignupLoginService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            LocalUserService,
            SocketService,
            CameraService,
            CampusService,
            RoomService])
    ], SignupLoginService);
    return SignupLoginService;
}());
export { SignupLoginService };
//# sourceMappingURL=signup-login.service.js.map