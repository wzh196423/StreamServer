import {Component} from "@angular/core";
import {Channel} from "../../../entities/channel";
import {ChannelService} from "../../../service/channel.service";
import {AlertController, App, NavController, ToastController} from "ionic-angular";
import {LiveRoom} from "../../../entities/liveRoom";
import {LiveRoomService} from "../../../service/liveRoom.service";
import {ChannelAddPage} from "./channel-add.component";
import {LiveRoomAddPage} from "./live-room-add.component";
import {LiveRoomDetailPage} from "./live-room-detail.component";

@Component({
  selector: 'page-channel-detail',
  templateUrl: 'channel-manage.component.html'
})

export class ChannelManagePage{
  channelList: Channel[];
  liveRoomList: LiveRoom[];
  hidden:boolean = true;
  constructor(
    public channelService: ChannelService,
    public navCtrl: NavController,
    public liveRoomService: LiveRoomService,
    public appCtrl: App,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
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

  showDelete(){
    this.hidden = ! this.hidden;
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
    this.appCtrl.getRootNavs()[0].push(ChannelAddPage);
  }

  addLiveRoom(channel:Channel){
    this.appCtrl.getRootNavs()[0].push(LiveRoomAddPage, {
      channel: channel
    });
  }

  showLiveRoomDetail(channel:Channel,liveRoom:LiveRoom){
    this.appCtrl.getRootNavs()[0].push(LiveRoomDetailPage,{
      liveRoom:liveRoom,
      channel:channel
    })
  }
  deleteLiveRoom(liveRoom:LiveRoom){
    console.log('delete');
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除标题为"'+liveRoom.title+'"的直播间?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '删除',
          handler: () => {
            console.log('delete clicked');
            this.liveRoomService.deleteLiveRoom(liveRoom).then( (data) => {
              if (data == 'success'){
                let toast = this.toastCtrl.create({
                  message:"删除成功",
                  duration:2000,
                  position:'middle',
                });
                toast.present();
              }else{
                alert = this.alertCtrl.create({
                  title: '删除失败',
                  subTitle: data == 'error'?'服务器错误，请重试':'还存在绑定该直播间的直播流，无法删除，请仔细检查',
                  buttons: ['确定']
                });
                alert.present();
              }
            })
          }
        }
      ]
    });
    alert.present();
  }
  deleteChannel(channel:Channel){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除"'+channel.category+'"直播频道?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '删除',
          handler: () => {
            console.log('delete clicked');
            this.channelService.deleteChannel(channel).then( (data) => {
              if (data == 'success'){
                let toast = this.toastCtrl.create({
                  message:"删除成功",
                  duration:2000,
                  position:'middle',
                });
                toast.present();
              }else{
                alert = this.alertCtrl.create({
                  title: '删除失败',
                  subTitle: data == 'error'?'服务器错误，请重试':'该频道下还存在直播间，无法删除，请仔细检查',
                  buttons: ['确定']
                });
                alert.present();
              }
            })
          }
        }
      ]
    });
    alert.present();
  }
}
