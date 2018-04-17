import {Component} from "@angular/core";
import {Channel} from "../../../entities/channel";
import {ChannelService} from "../../../service/channel.service";
import {NavController} from "ionic-angular";
import {LiveRoom} from "../../../entities/liveRoom";
import {LiveRoomService} from "../../../service/liveRoom.service";
import {ChannelAddPage} from "./channel-add.component";
import {LiveRoomAddPage} from "./liveRoom-add.component";

@Component({
  selector: 'page-channel-detail',
  templateUrl: 'channel-manage.component.html'
})

export class ChannelManagePage{
  channelList: Channel[];
  liveRoomList: LiveRoom[];
  constructor(
    public channelService: ChannelService,
    public navCtrl: NavController,
    public liveRoomService: LiveRoomService
  ){
    this.channelList = channelService.getChannelList();
    this.liveRoomList = liveRoomService.getLiveRoomList();
  }

  getShortDescrip(channel:Channel){
    let result = channel.description;
    if (result.length < 10)
      return result;
    else
      return result.substr(0,10)+"...";
  }

  ionViewDidEnter(){
    this.channelService.updateChannelList().then( channels =>{
      this.channelList = channels;
    });
    this.liveRoomService.updateLiveRoomList().then(liveRooms =>{
      this.liveRoomList = liveRooms;
    });
    this.channelService.registerPage(this);
    this.liveRoomService.registerPage(this);
  }

  ionViewDidLeave(){
    this.channelService.removePage(this);
    this.liveRoomService.removePage(this);
  }

  update(){
    this.channelService.updateChannelList().then( channels =>{
      this.channelList = channels;
    });
    this.liveRoomService.updateLiveRoomList().then(liveRooms =>{
      this.liveRoomList = liveRooms;
    });
  }

  addChannel(){
    this.navCtrl.push(ChannelAddPage);
  }

  addLiveRoom(channel:Channel){
    this.navCtrl.push(LiveRoomAddPage, {
      channel: channel
    });
  }

  showLiveRoomDetail(liveRoom:LiveRoom){

  }
}
