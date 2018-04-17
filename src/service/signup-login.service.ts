import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {User} from "../entities/user";

import {SocketService} from './socket.service';
import {LocalUserService} from './local-user.service'
import {CameraService} from "./camera.service";
import {CampusService} from "./campus.service";
import {RoomService} from "./room.service";


@Injectable()
export class SignupLoginService {

  constructor(public http: Http,
              public localUserService: LocalUserService,
              public socketService: SocketService,
              public cameraService: CameraService,
              public campusService: CampusService,
              public roomService: RoomService) {

  }

  login(username, password) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://120.25.238.161:3000/user/login';
    let info = {
      username: username,
      password: password,
    };

    return this.http.post(url, JSON.stringify(info), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          let infoGet = JSON.parse(res.json().user);
          let user = new User(infoGet.username, infoGet.nickname);

          return this.socketService.socketConnect().then(data => {
            if (data === 'success') {
              return this.socketService.emitPromise('login', infoGet.username).then((data) => {
                if (data === 'success') {
                  // 更新所有service的变量
                  let updateAll = [
                    this.localUserService.setLocalUser(user),
                    this.roomService.updateAfterLogin(),
                    this.campusService.updateAfterLogin(),
                    this.cameraService.updateAfterLogin(),
                  ];

                  return Promise.all(updateAll).then(data => {
                    console.log('update all services success');
                    // TODO
                    return Promise.resolve('#@-success#'+user.username);
                  });
                }
                return Promise.resolve('SignupLoginService-login-error');
              }).catch(error => {
                console.log('SignupLoginService-login:', error);
                return Promise.resolve('SignupLoginService-login-error');
              });
            } else {
              return Promise.resolve('SignupLoginService-login-error');
            }
          });
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('SignupLoginService-login', error);
        return Promise.resolve('error');
      });
  }

  signup(username, password, nickname) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://120.25.238.161:3000/user/addUser';
    let user = {
      username: username,
      password: password,
      nickname: nickname,
    };

    return this.http.post(url, JSON.stringify(user), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('SignupLoginService-signup', error);
      });

  }
  changePassword(username,oldPsw,newPsw){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://120.25.238.161:3000/user/modifyPassword';
    let info = {
      username:username,
      oldPassword:oldPsw,
      newPassword:newPsw
    };
    return this.http.put(url,JSON.stringify(info),options)
      .toPromise()
      .then((res) => {
        if (typeof res.json().data === 'string') {
          return Promise.resolve(res.json().data)
        }
        return Promise.resolve('error');
      }).catch((error) => {
        console.log('SignupLoginService-changePassword', error);
        return Promise.resolve('error');
      })
  }


}
