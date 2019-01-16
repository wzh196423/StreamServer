import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {ChannelService} from "../../service/channel.service";
import {LiveRoomService} from "../../service/liveRoom.service";
import {Channel} from "../../entities/channel";
import {LiveRoom} from "../../entities/liveRoom";
import {LiveRoomDetailPage} from "../management/channel/live-room-detail.component";
import videojs from 'video.js';

@Component({
  selector: 'page-live-tab',
  templateUrl: 'live-tab.component.html'
})
export class LiveTabPage {
  channelList:Channel[];
  liveRoomList:LiveRoom[];
  showAll:Map<number,boolean> = new Map<number,boolean>();

  constructor(public navCtrl: NavController,
              public appCtrl: App,
              public channelService: ChannelService,
              public liveRoomService: LiveRoomService) {
    this.channelList = this.channelService.getChannelList();
    this.liveRoomList = this.liveRoomService.getLiveRoomList();
    this.channelList.forEach(item => {
      this.showAll.set(item.id,false);
    });

  }

  checkAllLiveRooms(channel:Channel){
    this.showAll.set(channel.id,!this.showAll.get(channel.id));
    // this.appCtrl.getRootNavs()[0].push(ChannelDetailPage,{
    //   liveRoomList:this.liveRoomService.getLiveRoomByChannel(channel),
    //   channel:channel
    // })
  }

  ionViewDidEnter(){
    this.channelService.updateChannelList().then( channels =>{
      this.channelList = channels;
      this.showAll.clear();
      this.channelList.forEach(item => {
        this.showAll.set(item.id,false);
      })
    });
    this.liveRoomService.updateLiveRoomList().then(liveRooms =>{
      this.liveRoomList = liveRooms;
    });
    this.channelService.registerPage(this);
    this.liveRoomService.registerPage(this);
    // var player = videojs("p1");
    // player.play();
  }

  ionViewDidLeave(){
    this.channelService.removePage(this);
    this.liveRoomService.removePage(this);
  }

  update(){
    this.channelService.updateChannelList().then( channels =>{
      this.channelList = channels;
      this.showAll.clear();
      this.channelList.forEach(item => {
        this.showAll.set(item.id,false);
      });
    });
    this.liveRoomService.updateLiveRoomList().then(liveRooms =>{
      this.liveRoomList = liveRooms;
    });
  }

  showLiveRoomDetail(channel:Channel,liveRoom:LiveRoom){
    this.navCtrl.push(LiveRoomDetailPage,{
      liveRoom:liveRoom,
      channel:channel
    })
  }

}
