import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {ChannelService} from "../../service/channel.service";
import {LiveRoomService} from "../../service/liveRoom.service";
import {Channel} from "../../entities/channel";
import {LiveRoom} from "../../entities/liveRoom";
import {ChannelDetailPage} from "./channel-detail.component";

@Component({
  selector: 'page-about',
  templateUrl: 'live-tab.component.html'
})
export class LiveTabPage {
  channelList:Channel[];
  liveRoomList:LiveRoom[];

  constructor(public navCtrl: NavController,
              public appCtrl: App,
              public channelService: ChannelService,
              public liveRoomService: LiveRoomService) {
    this.channelList = this.channelService.getChannelList();
    this.liveRoomList = this.liveRoomService.getLiveRoomList();
  }

  checkAllLiveRooms(channel:Channel){
    this.navCtrl.push(ChannelDetailPage,{
      liveRoomList:this.liveRoomService.getLiveRoomByChannel(channel),
      channel:channel
    })
  }

}
