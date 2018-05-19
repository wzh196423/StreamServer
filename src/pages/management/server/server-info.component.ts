import {Component} from "@angular/core";
import {Server} from "../../../entities/server";
import {AlertController, App, NavController, NavParams, ToastController} from "ionic-angular";
import {LiveServerService} from "../../../service/liveServer.service";
import {RootServerService} from "../../../service/rootServer.service";
import {LiveServer} from "../../../entities/liveServer";
import {RootServer} from "../../../entities/rootServer";
import {ServerService} from "../../../service/server.service";
import {ServerRegisterPage, ServerType} from "./server-register.component";
import {LiveServerInfoPage} from "./live-server-info.component";

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
              public navCtrl:NavController,
              public appCtrl: App,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController){
    this.server = navParams.get('server');
    this.roomName = navParams.get('roomName');
    this.liveServerList = liveServerService.getLiveServerByServer(this.server);
    this.rootServerList = rootServerService.getRootServerByServer(this.server);
  }


  getRootServerIpById(rootServerId:number){
    if (rootServerId == undefined)
      return '';
    let rootServer : RootServer = this.rootServerService.getRootServerById(rootServerId);
    if (rootServer != undefined) {
      let server: Server = this.serverService.getServerById(rootServer.serverId);
      return server.ip + ':' + rootServer.port;
    }else {
      return '';
    }
  }

  registerServer(type:number){
    console.log(type);
    this.appCtrl.getRootNavs()[0].push(ServerRegisterPage,{
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

  gotoLiveServer(liveServer: LiveServer){
    this.appCtrl.getRootNavs()[0].push(LiveServerInfoPage,{
      liveServer: liveServer,
      ip:this.server.ip + ":" + liveServer.port
    })
  }

  deleteLiveServer(liveServer:LiveServer){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除ip为"'+this.server.ip+':'+liveServer.port+'"的服务?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '删除',
          handler: () => {
            console.log('delete clicked');
            this.liveServerService.deleteLiveServer(liveServer).then( (data) => {
              if (data == 'success'){
                let toast = this.toastCtrl.create({
                  message:"删除成功",
                  duration:2000,
                  position:'middle',
                });
                toast.present();
              }else {
                alert = this.alertCtrl.create({
                  title: '删除失败',
                  subTitle: data == 'error'?'服务器错误，请重试':'该直播服务器上尚有直播流，无法删除，请仔细检查',
                  buttons: ['确定']
                });
                alert.present();
              }
            })
          }
        }
      ]
    });
    alert.present();
  }

  deleteRootServer(rootServer:RootServer){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除ip为"'+this.server.ip+':'+rootServer.port+'"的服务?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '删除',
          handler: () => {
            console.log('delete clicked');
            this.rootServerService.deleteRootServer(rootServer).then( (data) => {
              if (data == 'success'){
                let toast = this.toastCtrl.create({
                  message:"删除成功",
                  duration:2000,
                  position:'middle',
                });
                toast.present();
              }else {
                alert = this.alertCtrl.create({
                  title: '删除失败',
                  subTitle: data == 'error'?'服务器错误，请重试':'该rootServer下尚有liveServer，无法删除，请仔细检查',
                  buttons: ['确定']
                });
                alert.present();
              }
            })
          }
        }
      ]
    });
    alert.present();
  }

}
