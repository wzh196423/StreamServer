import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

import {User} from '../entities/user';

@Injectable()
export class LocalUserService {
  localUser: User;

  constructor(public http: Http,) {
    this.localUser = new User('Me', 'Who am I');
  }

  getLocalUser() {
    return this.localUser;
  }

  setLocalUser(user) {
    this.localUser = user;
  }

  modifyNickname(nickname) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://120.25.238.161:3000/user/modifyNickname';
    let info = {
      username: this.localUser.username,
      nickname: nickname,
    };

    return this.http.put(url, JSON.stringify(info), options)
      .toPromise()
      .then(res => {
        if (res.json().data === 'success') {
          this.localUser.nickname = nickname;
          return Promise.resolve('success');
        }
        return Promise.resolve('error');
      }).catch((error) => {
        console.log('LocalUserService-modifyNickname', error);
        return Promise.resolve('error');
      });
  }

  // modifyUserimage(imageURL) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers});
  //   let url = 'http://120.25.238.161:3000/user/modifyUserImage';
  //   let info = {
  //     username: this.localUser.username,
  //     userImage: imageURL,
  //   };
  //   return this.http.put(url, JSON.stringify(info), options)
  //     .toPromise()
  //     .then(res => {
  //       if (res.json().data === 'success') {
  //         this.localUser.userimage = imageURL;
  //         return Promise.resolve('success');
  //       }
  //       return Promise.resolve('error');
  //     }).catch((error) => {
  //       console.log('LocalUserService-modifyUserimage', error);
  //       return Promise.resolve('error');
  //     })
  // }
  //
  // modifyLocation(location) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers});
  //   let url = 'http://120.25.238.161:3000/user/modifyLocation';
  //   let info = {
  //     username: this.localUser.username,
  //     location: location,
  //   };
  //
  //   return this.http.put(url, JSON.stringify(info), options)
  //     .toPromise()
  //     .then(res => {
  //       if (res.json().data === 'success') {
  //         this.localUser.location = location;
  //         return Promise.resolve('success');
  //       }
  //       return Promise.resolve('error');
  //     }).catch((error) => {
  //       console.log('LocalUserService-modifyLocation', error);
  //       return Promise.resolve('error');
  //     });
  // }
}
