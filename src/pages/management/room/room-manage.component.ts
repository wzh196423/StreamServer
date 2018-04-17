import {Component} from "@angular/core";
import {Room} from "../../../entities/room";
import {Campus} from "../../../entities/campus";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {RoomService} from "../../../service/room.service";
import {CampusService} from "../../../service/campus.service";
import {CameraService} from "../../../service/camera.service";
import {CameraManagePage} from "../camera/camera-manage.component";
import {RoomAddPage} from "./room-add.component";

@Component({
  selector: 'page-room-detail',
  templateUrl: 'room-manage.component.html',
})

export class RoomManagePage{
  roomList : Room[];
  campusList : Campus[];

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public roomService : RoomService,
              public campusService : CampusService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.roomList = this.roomService.getRoomList();
    this.campusList = this.campusService.getCampusList();
  }

  showDetail(room : Room){
    let alert = this.alertCtrl.create({
      title: room.campusId + room.name,
      //message:"该教室位于" +this.map.get(room.campusId),
      buttons: ['确定']
    });
    alert.present();
  }

  ionViewDidEnter(){
    this.roomService.updateRoomList().then( rooms => {
      this.roomList = rooms;
    })
    this.campusService.updateCampusList().then( campuses => {
      this.campusList = campuses;
    })
    this.roomService.registerPage(this);
    this.campusService.registerPage(this);
  }

  ionViewDidLeave(){
    this.roomService.removePage(this);
    this.campusService.removePage(this);
  }

  update(){
    this.roomService.updateRoomList().then( rooms =>{
      this.roomList = rooms;
    });
    this.campusService.updateCampusList().then( campuses =>{
      this.campusList = campuses;
    });
    console.log('update' + this.roomList.length);
  }

  addRoom(){
    this.navCtrl.push(RoomAddPage);
  }

}
