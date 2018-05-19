import {Component} from "@angular/core";
import {Server} from "../../../entities/server";
import {ServerService} from "../../../service/server.service";
import {AlertController, App, NavController, ToastController} from "ionic-angular";
import {ServerAddPage} from "./server-add.component";
import {Room} from "../../../entities/room";
import {RoomService} from "../../../service/room.service";
import {Campus} from "../../../entities/campus";
import {CampusService} from "../../../service/campus.service";
import {ServerInfoPage} from "./server-info.component";

@Component({
  selector:'page-server-detail',
  templateUrl:'server-manage.component.html'
})

export class ServerManagePage{
  serverList:Server[];
  roomList:Room[];
  campusList:Campus[];
  constructor(public serverService:ServerService,
              public roomService:RoomService,
              public campusService:CampusService,
              public navCtrl: NavController,
              public appCtrl: App,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.serverList = this.serverService.getServerList();
    this.roomList = this.roomService.getRoomList();
    this.campusList = this.campusService.getCampusList();
  }

  addServer(){
    //this.navCtrl.push(ServerAddPage);
    this.appCtrl.getRootNavs()[0].push(ServerAddPage);
  }

  getRoomNameByRoomId(id:number){
    let roomName = '';
    let campusName = '';
    for(let room of this.roomList){
      if(room.id == id){
        roomName = room.name;
        for (let campus of this.campusList){
          if (room.campusId == campus.id){
            campusName = campus.name;
            break;
          }
        }
        break;
      }
    }
    return campusName+roomName;
  }

  ionViewDidEnter(){
    this.roomService.updateRoomList().then( rooms =>{
      this.roomList = rooms;
    })
    this.serverService.updateServerList().then(servers => {
      this.serverList = servers;
    })
    this.campusService.updateCampusList().then(campuses => {
      this.campusList = campuses;
    })
    this.campusService.registerPage(this);
    this.serverService.registerPage(this);
    this.roomService.registerPage(this);
  }

  ionViewDidLeave(){
    this.roomService.removePage(this);
    this.serverService.removePage(this);
    this.campusService.removePage(this);
  }

  update(){
    this.roomService.updateRoomList().then( rooms =>{
      this.roomList = rooms;
    })
    this.serverService.updateServerList().then(servers => {
      this.serverList = servers;
    })
    this.campusService.updateCampusList().then(campuses => {
      this.campusList = campuses;
    })
  }

  registerServer(){}

  gotoInfo(server:Server){
    this.appCtrl.getRootNavs()[0].push(ServerInfoPage,{
      server:server,
      roomName:this.getRoomNameByRoomId(server.roomId)
    })
  }

  deleteServer(server:Server){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除ip为"'+server.ip+'"的服务器?',
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
            this.serverService.deleteServer(server).then( (data) => {
              if (data == 'success'){
                let toast = this.toastCtrl.create({
                  message:"删除成功",
                  duration:2000,
                  position:'middle',
                });
                toast.present();
              }else {
                alert = this.alertCtrl.create({
                  title: '删除失败',
                  subTitle: data == 'error'?'服务器错误，请重试':'该服务器上运行了rootServer或liveServer，无法删除，请仔细检查',
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
