/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Server} from "../entities/server";

@Injectable()
export class ServerService{
  serverList : Server[];
  observers: any[];

  constructor(public http: Http) {
    this.serverList = [];
    this.observers = [];
    this.serverList.push(new Server('39.120.38.1','阿里云',new Date(),'快人一步的云服务器',100,12.8,1,2,2,1));
  }

  updateAfterLogin() {
    this.observers = [];
    //this.campusList = [];

    return this.updateServerList().then(servers => {
      this.serverList = servers;
      console.log('update ServerService success, ', this.serverList.length);
    });
  }

  // 重新从服务器获取服务器列表
  updateServerList() {
    let url = 'http://localhost:3000/server/getServers';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.serverList = JSON.parse(res.json().servers);
        return this.serverList;
      } else {
        console.log('ServerService-updateServerList:', res.json().data);
        return [];
      }
    }).catch(error => {
      return this.serverList;
      // TODO:
      // console.log(error);
      // return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getServerList() {
    return this.serverList;
  }

  addServer(server : Server) {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // let url = 'http://localhost:3000/server/addServer';
    // let c = {
    //   ip : server.ip,
    //   brand : server.brand,
    //   registerTime:server.registerTime,
    //   description:server.description,
    //   storage:server.storage,
    //   usedStorage:server.usedStorage,
    //   cores:server.cores,
    //   memory:server.memory,
    //   roomId:server.roomId,
    // };
    //
    // return this.http.post(url, JSON.stringify(c), options)
    //   .toPromise()
    //   .then((res) => {
    //     if (res.json().data === 'success') {
    //       this.serverList.push(server);
    //       this.update();
    //       return Promise.resolve('success');
    //     } else {
    //       return Promise.resolve('error');
    //     }
    //   }).catch((error) => {
    //     console.log('ServerService-addServer', error);
    //   });
    this.serverList.push(server);
    this.update();
    console.log(this.serverList.length);
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

  getServerById(id:number){
    return this.serverList.find( item => {
      return item.id == id;
    });
  }
}
