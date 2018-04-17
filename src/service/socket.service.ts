/**
 * Created by kadoufall on 2017/5/28.
 */
import {Injectable} from '@angular/core';

import {LocalUserService} from './local-user.service'
import {User} from "../entities/user";

@Injectable()
export class SocketService {
  socket;

  constructor(public localUserService: LocalUserService,) {

  }

  setSocketNull() {
    this.socket = null;
  }

  getSocket() {
    return this.socket;
  }

  socketConnect() {
    this.socket = io('http://120.25.238.161:3000', {'force new connection': true});
    this.socket.on('connect', () => {
      console.log('client_connects_success');
    });

    this.socket.on('connect_error', () => {
      console.log('connect_error');
    });
    /*
    this.socket.on('logout', () => {
      this.getSocket().disconnect();
      this.setSocketNull();
      this.navCtrl.setRoot(StartPage);
    });*/
    // 确保socket成功建立再返回
    return this.emitPromise('confirmConnect', '').then(data => {
      console.log(data);
      if (data === 'success') {
        return Promise.resolve('success');
      } else {
        return Promise.resolve('error');
      }
    }).catch(error => {
      console.log('SocketService-socketConnect:', error);
    });
  }

  emitPromise(command, data) {
    return new Promise<any>((resolve, reject) => {
      this.socket.emit(command, data, (response) => {
        if (typeof response === 'object') {
          if (response.success === true) {
            resolve(response.data);
          } else {
            if (typeof response.data === "string") {
              reject(response.data);
            } else {
              reject("The request was not successful.")
            }
          }
        } else {
          reject('The response to your request could not be parsed.');
        }
      });
    });
  }


}
