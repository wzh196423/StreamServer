import {Component} from "@angular/core";
import {RootServer} from "../../../entities/rootServer";
import {AlertController, App, LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {RootServerService} from "../../../service/rootServer.service";
import {Server} from "../../../entities/server";
import {ServerService} from "../../../service/server.service";
import {LiveServer} from "../../../entities/liveServer";
import {LiveServerService} from "../../../service/liveServer.service";

export enum ServerType{
  RootServer = 1,
  LiveServer = 2
}

@Component({
  selector:'page-server-register',
  templateUrl:'server-register.component.html'
})

export class ServerRegisterPage{

  type:number;
  server:Server;
  port:string = '';
  maxStream:number;
  rootServerList:RootServer[];
  rootServerId:number;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public rootServerService: RootServerService,
              public liveServerService: LiveServerService,
              public serverService:ServerService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,
              public appCtrl: App){
    this.type = navParams.get('type');
    this.server = navParams.get('server');
    this.rootServerList = rootServerService.getRootServerList();
  }

  getRootServerIpById(rootServerId:number){
    let rootServer : RootServer = this.rootServerService.getRootServerById(rootServerId);
    let server : Server = this.serverService.getServerById(rootServer.serverId);
    return server.ip+':'+rootServer.port;
  }

  onSubmit(){
    if (this.port == ''){
      let alert = this.alertCtrl.create({
        title: '添加失败',
        subTitle: '端口号不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else if (this.type == 2 && (this.maxStream == undefined || this.maxStream == 0)){
      let alert = this.alertCtrl.create({
        title: '添加失败',
        subTitle: '最大流数量不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();

    }else if (this.type == 2 && this.rootServerId == undefined){
      let alert = this.alertCtrl.create({
        title: '添加失败',
        subTitle: 'rootServer不能为空，请重新绑定',
        buttons: ['确定']
      });
      alert.present();
    } else{

      let loading = this.loadingCtrl.create({
        content: "添加中，请稍等",
        duration : 2000
      });
      loading.present();
      var toast = null;
      let temp = null;
      if (this.type == 1) {
        temp = new RootServer(this.port, this.server.id, 2);
        this.rootServerService.addRootServer(temp).then((data) =>{
          if (data === 'success'){
            toast = this.toastCtrl.create({
              message:"rootServer注册成功,port :" +this.port ,
              duration:2000,
              position:'middle',
            });
            toast.onDidDismiss(() => {
              this.appCtrl.navPop();
            });
            loading.dismiss();
            toast.present();
          }else{
            let alert = this.alertCtrl.create({
              title: 'rootServer注册失败',
              subTitle: '该端口下已有rootServer或服务器错误，请重试',
              buttons: ['确定']
            });
            loading.dismiss();
            alert.present();
          }
        })
      }
      else {
        temp = new LiveServer(this.port, this.maxStream, this.server.id, 1);
        this.liveServerService.addLiveServer(temp).then((data) =>{
          if (data === 'success'){
            toast = this.toastCtrl.create({
              message:"liveServer注册成功,port :" +this.port + ",maxStream :" + this.maxStream,
              duration:2000,
              position:'middle',
            });
            toast.onDidDismiss(() => {
              this.appCtrl.navPop();
            });
            loading.dismiss();
            toast.present();
          }else{
            let alert = this.alertCtrl.create({
              title: 'liveServer注册失败',
              subTitle: '该端口下已有liveServer或服务器错误，请重试',
              buttons: ['确定']
            });
            loading.dismiss();
            alert.present();
          }
        })
      }

    }
  }


}
