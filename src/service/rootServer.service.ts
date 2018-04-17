/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {RootServer} from "../entities/rootServer";
import {Server} from "../entities/server";

@Injectable()
export class RootServerService{
  rootServerList : RootServer[];
  observers: any[];

  constructor(public http: Http) {
    this.rootServerList = [];
    this.observers = [];
    this.rootServerList.push(new RootServer('1433',1,1));
  }

  updateAfterLogin() {
    this.observers = [];

    return this.updateRootServerList().then(servers => {
      this.rootServerList = servers;
      console.log('update RootServerService success, ', this.rootServerList.length);
    });
  }

  // 重新从服务器获取服务器列表
  updateRootServerList() {
    let url = 'http://localhost:3000/rootServer/getRootServers';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.rootServerList = JSON.parse(res.json().rootServers);
        return this.rootServerList;
      } else {
        console.log('RootServerService-updateRootServerList:', res.json().data);
        return [];
      }
    }).catch(error => {
      return this.rootServerList;
      // TODO:
      // console.log(error);
      // return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getRootServerList() {
    return this.rootServerList;
  }

  addRootServer(rootServer : RootServer) {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // let url = 'http://localhost:3000/rootServer/addRootServer';
    // let c = {
    //   port:rootServer.port,
    //   serverId:rootServer.serverId
    // };
    //
    // return this.http.post(url, JSON.stringify(c), options)
    //   .toPromise()
    //   .then((res) => {
    //     if (res.json().data === 'success') {
    //       this.rootServerList.push(rootServer);
    //       this.update();
    //       return Promise.resolve('success');
    //     } else {
    //       return Promise.resolve('error');
    //     }
    //   }).catch((error) => {
    //     console.log('RootServerService-addRootServer', error);
    //   });
    this.rootServerList.push(rootServer);
    this.update();
    console.log(this.rootServerList.length);
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

  getRootServerById(id:number){
    return this.rootServerList.find(item => {
      return item.id == id;
    })
  }

  getRootServerByServer(server:Server){
    return this.rootServerList.filter(item => {
      return item.serverId == server.id;
    })
  }
}
