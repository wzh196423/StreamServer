import {Component} from "@angular/core";
import {ChannelService} from "../../../service/channel.service";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {Room} from "../../../entities/room";
import {Channel} from "../../../entities/channel";

@Component({
  selector: 'page-channel-add',
  templateUrl: 'channel-add.component.html'
})

export class ChannelAddPage{
  category:string;
  description:string;
  constructor(public channelService:ChannelService,
              public navCtrl:NavController,
              public appCtrl:App,
              public alertCtrl:AlertController,
              public loadingCtrl:LoadingController,
              public toastCtrl:ToastController){
    this.category = '';
    this.description = '';
  }

  onSubmit(){
    if (this.category === null || this.category === ''){
      let alert = this.alertCtrl.create({
        title: '添加频道失败',
        subTitle: '频道分类名不能为空，请重新选择',
        buttons: ['确定']
      });
      alert.present();
    }else if(this.description === undefined || this.description === ''){
      let alert = this.alertCtrl.create({
        title: '添加频道失败',
        subTitle: '频道描述不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else{
      let loading = this.loadingCtrl.create({
        content: "添加中，请稍等",
        duration : 2000
      });
      loading.present();
      var toast = null;
      var temp = new Channel(this.category,this.description);
      this.channelService.addChannel(temp).then( (data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"频道添加成功,分类 :" +this.category + ",描述 :" + this.description,
            duration:2000,
            position:'middle',
          });
          toast.onDidDismiss(() => {
            //this.appCtrl.getRootNav().push(RoomManagePage)
            this.appCtrl.navPop();
          });
          loading.dismiss();
          toast.present();
        }else{
          let alert = this.alertCtrl.create({
            title: '添加频道失败',
            subTitle: '已有同名频道或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }
}
