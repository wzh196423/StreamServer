import {Component} from "@angular/core";
import {LiveServer} from "../../../entities/liveServer";
import {DirectStreamService} from "../../../service/directStream.service";
import {AlertController, App, LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {Camera} from "../../../entities/camera";
import {DirectStream} from "../../../entities/directStream";

@Component({
  selector:'page-live-server-add',
  templateUrl:'direct-stream-add.component.html'
})

export class DirectStreamAddPage{
  liveServer: LiveServer;
  url:string = '';

  constructor(public directStreamService: DirectStreamService,
              public navParam: NavParams,
              public navCtrl: NavController,
              public appCtrl: App,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,
              ){
    this.liveServer = navParam.get('liveServer');
  }

  onSubmit(){
    if (this.url == undefined || this.url == '' ){
      let alert = this.alertCtrl.create({
        title: '添加直推流失败',
        subTitle: '直推流url不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else{
      let loading = this.loadingCtrl.create({
        content: "添加中中，请稍等",
        duration : 2000
      });
      loading.present();
      var toast = null;
      let temp = new DirectStream(this.url,false,this.liveServer.id);
      this.directStreamService.addDirectStream(temp).then((data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"直推流添加成功,url :" +this.url,
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
            title: '添加失败',
            subTitle: '已有同地址直推流或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }

}
