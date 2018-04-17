/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Channel} from "../entities/channel";

@Injectable()
export class ChannelService{
  channelList : Channel[];
  observers: any[];

  constructor(public http: Http) {
    this.channelList = [];
    this.channelList.push(new Channel('化学','包含所有化学课程',1));
    this.channelList.push(new Channel('物理','所有物理相关的课程直播都在这儿',2));
    this.observers = [];
  }

  updateAfterLogin() {
    this.observers = [];
    //this.campusList = [];

    return this.updateChannelList().then(channels => {
      this.channelList = channels;
      console.log('update ChannelService success, ', this.channelList.length);
    });
  }

  // 重新从服务器获取频道列表
  updateChannelList() {
    let url = 'http://localhost:3000/channel/getChannels';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.channelList = JSON.parse(res.json().channels);
        return this.channelList;
      } else {
        console.log('ChannelService-updateChannelList:', res.json().data);
        return [];
      }
    }).catch(error => {
      return this.channelList;
      // TODO:
      // console.log(error);
      // return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getChannelList() {
    return this.channelList;
  }

  addChannel(channel : Channel) {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // let url = 'http://localhost:3000/channel/addChannel';
    // let c = {
    //   category: channel.category,
    //   description: channel.description
    // };
    //
    // return this.http.post(url, JSON.stringify(c), options)
    //   .toPromise()
    //   .then((res) => {
    //     if (res.json().data === 'success') {
    //       this.channelList.push(channel);
    //       this.update();
    //       return Promise.resolve('success');
    //     } else {
    //       return Promise.resolve('error');
    //     }
    //   }).catch((error) => {
    //     console.log('ChannelService-addChannel', error);
    //   });
    this.channelList.push(channel);
    this.update();
    console.log(this.channelList.length);
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
}
