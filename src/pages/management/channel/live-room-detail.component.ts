import {Component} from "@angular/core";
import {LiveRoom} from "../../../entities/liveRoom";
import {LiveRoomService} from "../../../service/liveRoom.service";
import {AlertController, App, LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {Channel} from "../../../entities/channel";
import {DirectStreamService} from "../../../service/directStream.service";
import {DirectStream} from "../../../entities/directStream";
import {LiveRoomWatchPage} from "./live-room-watch.component";

@Component({
  selector:'page-live-room-detail',
  templateUrl:'live-room-detail.component.html'
})

export class LiveRoomDetailPage{
  liveRoom:LiveRoom;
  channel:Channel;
  directStreamList:DirectStream[];
  constructor(public liveRoomService: LiveRoomService,
              public directStreamService: DirectStreamService,
              public navParam: NavParams,
              public alertCtrl: AlertController,
              public appCtrl: App,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController
              ){
    this.liveRoom = navParam.get('liveRoom');
    this.channel = navParam.get('channel');
    this.directStreamList = directStreamService.getDirectStreamList();
  }

  ionViewDidEnter(){
    this.directStreamService.updateDirectStreamList().then(streams => {
      this.directStreamList = streams;
    });
    this.directStreamService.registerPage(this);
  }

  ionViewDidLeave(){
    this.directStreamService.removePage(this);
  }

  update(){
    this.directStreamService.updateDirectStreamList().then(streams => {
      this.directStreamList = streams;
    });
  }

  watch(ds:DirectStream){
    this.navCtrl.push(LiveRoomWatchPage,{
      directStream:ds,
      liveRoom:this.liveRoom
    })
  }


}
