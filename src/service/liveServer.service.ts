/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {LiveServer} from "../entities/liveServer";
import {Server} from "../entities/server";

@Injectable()
export class LiveServerService{
  liveServerList : LiveServer[];
  observers: any[];

  constructor(public http: Http) {
    this.liveServerList = [];
    this.observers = [];
    this.liveServerList.push(new LiveServer('1527',6,1,1,1));
  }

  updateAfterLogin() {
    this.observers = [];
    //this.campusList = [];

    return this.updateLiveServerList().then(servers => {
      this.liveServerList = servers;
      console.log('update LiveServerService success, ', this.liveServerList.length);
    });
  }

  // 重新从服务器获取服务器列表
  updateLiveServerList() {
    let url = 'http://localhost:3000/server/getServers';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.liveServerList = JSON.parse(res.json().liveServers);
        return this.liveServerList;
      } else {
        console.log('LiveServerService-updateLiveServerList:', res.json().data);
        return [];
      }
    }).catch(error => {
      return this.liveServerList;
      // TODO:
      // console.log(error);
      // return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getLiveServerList() {
    return this.liveServerList;
  }

  addLiveServer(liveServer : LiveServer) {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // let url = 'http://localhost:3000/server/addServer';
    // let c = {
    //   port:liveServer.port,
    //   serverId:liveServer.serverId,
    //   maxStream:liveServer.maxStream,
    //   rootServerId:liveServer.rootServerId
    // };
    //
    // return this.http.post(url, JSON.stringify(c), options)
    //   .toPromise()
    //   .then((res) => {
    //     if (res.json().data === 'success') {
    //       this.liveServerList.push(liveServer);
    //       this.update();
    //       return Promise.resolve('success');
    //     } else {
    //       return Promise.resolve('error');
    //     }
    //   }).catch((error) => {
    //     console.log('LiveServerService-addServer', error);
    //   });
    this.liveServerList.push(liveServer);
    this.update();
    console.log(this.liveServerList.length);
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

  getLiveServerByServer(server:Server){
    return this.liveServerList.filter(item => {
      return item.serverId == server.id;
    })
  }
}
