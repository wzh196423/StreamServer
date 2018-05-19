/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Channel} from "../entities/channel";
import {Campus} from "../entities/campus";

@Injectable()
export class ChannelService{
  channelList : Channel[];
  observers: any[];

  constructor(public http: Http) {
    this.channelList = [];
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
      console.log(error);
      return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getChannelList() {
    return this.channelList;
  }

  addChannel(channel : Channel) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/channel/addChannel';
    let c = {
      category: channel.category,
      description: channel.description
    };

    return this.http.post(url, JSON.stringify(c), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          channel.id = res.json().id;
          this.channelList.push(channel);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('ChannelService-addChannel', error);
        return Promise.resolve('error');
      });
    // this.channelList.push(channel);
    // this.update();
    // console.log(this.channelList.length);
    // return Promise.resolve('success');

  }
  deleteChannel(channel:Channel){
    let url = 'http://localhost:3000/channel/deleteChannel?id='+channel.id;
    return this.http.delete(url)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          this.channelList.splice(this.channelList.indexOf(channel),1);
          console.log(channel);
          this.update();
          return Promise.resolve('success');
        } else if (res.json().data == 'ForeignKeyConstraintError'){
          return Promise.resolve('constraintError');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('ChannelService-deleteChannel', error);
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
