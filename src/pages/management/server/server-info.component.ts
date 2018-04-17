import {Component} from "@angular/core";
import {Server} from "../../../entities/server";
import {NavController, NavParams} from "ionic-angular";
import {LiveServerService} from "../../../service/liveServer.service";
import {RootServerService} from "../../../service/rootServer.service";
import {LiveServer} from "../../../entities/liveServer";
import {RootServer} from "../../../entities/rootServer";
import {ServerService} from "../../../service/server.service";
import {ServerRegisterPage, ServerType} from "./server-register.component";

@Component({
  selector:'page-server-info',
  templateUrl:'server-info.component.html'
})

export class ServerInfoPage{
  server:Server;
  liveServerList:LiveServer[];
  rootServerList:RootServer[];
  roomName:string;

  constructor(public navParams: NavParams,
              public liveServerService:LiveServerService,
              public rootServerService:RootServerService,
              public serverService:ServerService,
              public navCtrl:NavController){
    this.server = navParams.get('server');
    this.roomName = navParams.get('roomName');
    this.liveServerList = liveServerService.getLiveServerByServer(this.server);
    this.rootServerList = rootServerService.getRootServerByServer(this.server);
  }


  getRootServerIpById(rootServerId:number){
    let rootServer : RootServer = this.rootServerService.getRootServerById(rootServerId);
    let server : Server = this.serverService.getServerById(rootServer.serverId);
    return server.ip+':'+rootServer.port;
  }

  registerServer(type:number){
    console.log(type);
    this.navCtrl.push(ServerRegisterPage,{
      type:type,
      server:this.server
    })
  }

  ionViewDidEnter(){
    this.liveServerService.updateLiveServerList().then( liveServers =>{
      this.liveServerList = liveServers;
    })
    this.rootServerService.updateRootServerList().then(rootServers => {
      this.rootServerList = rootServers;
    })
    this.liveServerService.registerPage(this);
    this.rootServerService.registerPage(this);
  }

  ionViewDidLeave(){
    this.liveServerService.removePage(this);
    this.rootServerService.removePage(this);
  }

  update(){
    this.liveServerService.updateLiveServerList().then( liveServers =>{
      this.liveServerList = liveServers;
    })
    this.rootServerService.updateRootServerList().then(rootServers => {
      this.rootServerList = rootServers;
    })
  }

}
