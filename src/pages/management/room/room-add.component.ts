import {Component} from "@angular/core";
import {Room} from "../../../entities/room";
import {Campus} from "../../../entities/campus";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {RoomService} from "../../../service/room.service";
import {CampusService} from "../../../service/campus.service";
import {CameraService} from "../../../service/camera.service";
import {CameraManagePage} from "../camera/camera-manage.component";

@Component({
  selector: 'page-room-add',
  templateUrl: 'room-add.component.html',
})

export class RoomAddPage{
  roomList : Room[];
  campusList : Campus[];
  newId : string;
  newCampusId :number;
  map: Map<number,string>;// campus id-name 的映射

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public roomService : RoomService,
              public campusService : CampusService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.roomList = this.roomService.getRoomList();
    this.campusList = this.campusService.getCampusList();
    this.newId = "";
    this.newCampusId = null;
    this.map = new Map<number, string>();
    for(let c of this.campusList){
      this.map.set(c.id,c.name);
    }
  }

  onSubmit(){
    if (this.newCampusId === null || this.newCampusId === undefined){
      let alert = this.alertCtrl.create({
        title: '添加教室失败',
        subTitle: '校区不能为空，请重新选择',
        buttons: ['确定']
      });
      alert.present();
    }else if(this.newId === undefined || this.newId === ''){
      let alert = this.alertCtrl.create({
        title: '添加教室失败',
        subTitle: '教室名不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else{
      let loading = this.loadingCtrl.create({
        content: "注册中，请稍等",
        duration : 2000
      });
      loading.present();
      var toast = null;
      var temp = new Room(this.newId,this.newCampusId,this.roomList.length+1);
      this.roomService.addRoom(temp).then( (data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"教室添加成功,校区 :" +this.newCampusId + ",教室名 :" + this.newId,
            duration:2000,
            position:'middle',
          });
          toast.onDidDismiss(() => {
            //this.appCtrl.getRootNav().push(RoomManagePage)
            this.appCtrl.navPop();
            //this.appCtrl.viewDidEnter;
            //this.appCtrl.getRootNav().push(RoomManagePage);
            //this.navCtrl.setRoot(RoomManagePage);
          });
          loading.dismiss();
          toast.present();
        }else{
          let alert = this.alertCtrl.create({
            title: '添加教室失败',
            subTitle: '教室已被注册或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }

  showDetail(room : Room){
    let alert = this.alertCtrl.create({
      title: room.campusId + room.name,
      message:"该教室位于" +this.map.get(room.campusId),
      buttons: ['确定']
    });
    alert.present();
  }

  // ionViewDidEnter(){
  //   this.roomService.updateRoomList().then( rooms => {
  //     this.roomList = rooms;
  //   })
  //   this.campusService.updateCampusList().then( campuses => {
  //     this.campusList = campuses;
  //   })
  //   this.roomService.registerPage(this);
  //   this.campusService.registerPage(this);
  // }
  //
  // ionViewDidLeave(){
  //   this.roomService.removePage(this);
  //   this.campusService.removePage(this);
  // }
  //
  // update(){
  //   this.roomService.updateRoomList().then( rooms =>{
  //     this.roomList = rooms;
  //   });
  //   this.campusService.updateCampusList().then( campuses =>{
  //     this.campusList = campuses;
  //   });
  //   console.log('update' + this.roomList.length);
  // }

}
