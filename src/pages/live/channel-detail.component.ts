import {Component} from "@angular/core";
import {LiveRoom} from "../../entities/liveRoom";
import {App, NavController, NavParams} from "ionic-angular";
import {Channel} from "../../entities/channel";

@Component({
  selector:'page-channel-detail',
  templateUrl:'channel-detail.component.html'
})

export class ChannelDetailPage{
  liveRoomList:LiveRoom[];
  channel:Channel;
  constructor(public appCtrl: App,
              public navParams: NavParams,
              public navCtrl:NavController){
    this.liveRoomList = navParams.get('liveRoomList');
    this.channel = navParams.get('channel');
  }

  gotoLiveRoom(liveRoom:LiveRoom){

  }
}
