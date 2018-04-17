import {Component} from "@angular/core";
import {Channel} from "../../../entities/channel";
import {AlertController, App, LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {LiveRoom} from "../../../entities/liveRoom";
import {LiveRoomService} from "../../../service/liveRoom.service";

@Component({
  selector: 'page-liveRoom-add',
  templateUrl: 'liveRoom-add.component.html'
})

export class LiveRoomAddPage{
  channel:Channel;
  title:string;
  description:string;
  teacherName:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public liveRoomService: LiveRoomService,
              public appCtrl : App){
    this.channel = navParams.get('channel');
    this.title = '';
    this.description = '';
    this.teacherName = '';
  }

  onSubmit(){
    if (this.title === null || this.title === ''){
      let alert = this.alertCtrl.create({
        title: '添加直播间失败',
        subTitle: '直播间标题不能为空，请重新选择',
        buttons: ['确定']
      });
      alert.present();
    }else if(this.description === undefined || this.description === ''){
      let alert = this.alertCtrl.create({
        title: '添加直播间失败',
        subTitle: '直播间描述不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else if(this.teacherName === undefined || this.teacherName === ''){
      let alert = this.alertCtrl.create({
        title: '添加直播间失败',
        subTitle: '直播间主讲人姓名不能为空，请重新输入',
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
      var temp = new LiveRoom(this.title,this.description,this.channel.id,0,this.teacherName,10);
      this.liveRoomService.addLiveRoom(temp).then( (data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"直播间添加成功,标题 :" +this.title + ",描述 :" + this.description,
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
            title: '添加直播间失败',
            subTitle: '已有同名直播间或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }
}
