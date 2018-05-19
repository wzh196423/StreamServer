import {Component} from "@angular/core";
import {DirectStreamService} from "../../../service/directStream.service";
import {AlertController, App, LoadingController, NavParams, ToastController} from "ionic-angular";
import {LiveRoomService} from "../../../service/liveRoom.service";
import {Server} from "../../../entities/server";
import {DirectStream} from "../../../entities/directStream";
import {LiveRoom} from "../../../entities/liveRoom";

@Component({
  selector: 'page-direct-stream-detail',
  templateUrl: 'direct-stream-detail.component.html'
})

export class DirectStreamDetailPage {
  liveServerIp: string;
  directStream: DirectStream;
  liveRoomList: LiveRoom[];
  liveRoomTitle: string;
  bindLiveRoomId: number;
  newStatus: boolean;

  constructor(public liveRoomService: LiveRoomService,
              public directStreamService: DirectStreamService,
              public navParam: NavParams,
              public alertCtrl: AlertController,
              public appCtrl: App,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
    this.liveServerIp = navParam.get('liveServerIp');
    this.directStream = navParam.get('directStream');
    this.liveRoomTitle = navParam.get('liveRoomTitle');
    this.liveRoomList = liveRoomService.getLiveRoomList();
    this.newStatus = this.directStream.status;
  }

  ionViewDidEnter() {
    this.liveRoomService.updateLiveRoomList().then(liveRooms => {
      this.liveRoomList = liveRooms;
    });
    this.liveRoomService.registerPage(this);
  }

  ionViewDidLeave() {
    this.liveRoomService.removePage(this);
  }

  update() {
    this.liveRoomService.updateLiveRoomList().then(liveRooms => {
      this.liveRoomList = liveRooms;
    });
  }

  onSubmit() {
    let loading = this.loadingCtrl.create({
      content: "绑定中，请稍等",
      duration: 2000
    });
    loading.present();
    loading.present();
    var toast = null;
    this.directStreamService.bindLiveRoom(this.directStream, this.bindLiveRoomId)
      .then(data => {
        if (data === 'success') {
          toast = this.toastCtrl.create({
            message: "直播流绑定直播间成功,directStreamId :" + this.directStream.id + ",liveRoomId : " + this.bindLiveRoomId,
            duration: 2000,
            position: 'middle',
          });
          toast.onDidDismiss(() => {
            this.appCtrl.navPop();
          });
          loading.dismiss();
          toast.present();
        } else {
          let alert = this.alertCtrl.create({
            title: '直播流绑定直播间失败',
            subTitle: '服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })


  }
}
