import {Component} from "@angular/core";
import {LiveServerService} from "../../../service/liveServer.service";
import {DirectStreamService} from "../../../service/directStream.service";
import {AlertController, App, NavController, NavParams, ToastController} from "ionic-angular";
import {LiveServer} from "../../../entities/liveServer";
import {DirectStream} from "../../../entities/directStream";
import {ServerService} from "../../../service/server.service";
import {Server} from "../../../entities/server";
import {LiveRoomService} from "../../../service/liveRoom.service";
import {LiveRoom} from "../../../entities/liveRoom";
import {DirectStreamAddPage} from "./direct-stream-add.component";
import {DirectStreamDetailPage} from "./direct-stream-detail.component";

@Component({
  templateUrl: 'live-server-info.component.html',
  selector: 'page-live-server-info'
})

export class LiveServerInfoPage{
  server: Server;
  liveServer: LiveServer;
  directStreamList: DirectStream[];
  liveRoom: LiveRoom;
  ip:string;
  constructor(public directStreamService: DirectStreamService,
              public serverService: ServerService,
              public liveRoomService: LiveRoomService,
              public navCtrl: NavController,
              public appCtrl: App,
              public navParam: NavParams,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.liveServer = navParam.get('liveServer');
    this.ip = navParam.get('ip');
    this.directStreamList = directStreamService.getDirectStreamsByLiveServer(this.liveServer);
    this.server = serverService.getServerById(this.liveServer.serverId);
  }

  getTitle(directStream:DirectStream){
    //if (directStream != undefined){
      let lr = this.liveRoomService.getLiveRoomById(directStream.liveRoomId);
      if (lr != undefined)
        return lr.title;
      else
        return '';
    //}
    //return '';
  }

  addDirectStream(){
    this.appCtrl.getRootNavs()[0].push(DirectStreamAddPage,{
      liveServer:this.liveServer
    });
  }

  ionViewDidEnter(){
    this.directStreamService.updateDirectStreamList().then( directStreams =>{
      this.directStreamList = directStreams;
    });
    this.directStreamService.registerPage(this);
  }

  ionViewDidLeave(){
    this.directStreamService.removePage(this);
  }

  update(){
    this.directStreamService.updateDirectStreamList().then( directStreams =>{
      this.directStreamList = directStreams;
    });
  }

  deleteDirectStream(directStream:DirectStream){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除url为"'+directStream.url+'"的直播流?',
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
            this.directStreamService.deleteDirectStream(directStream).then( (data) => {
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
                  subTitle: data == 'error'?'服务器错误，请重试':'存在绑定了该直播流的摄像头，无法删除，请仔细检查',
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

  showDetail(directStream:DirectStream){
    this.appCtrl.getRootNavs()[0].push(DirectStreamDetailPage,{
      liveServerIp:this.server.ip+":"+this.liveServer.port,
      directStream:directStream,
      liveRoomTitle:this.getTitle(directStream)
    })
  }
}

