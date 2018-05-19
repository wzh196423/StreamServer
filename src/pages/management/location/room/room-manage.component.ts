import {Component} from "@angular/core";
import {Room} from "../../../../entities/room";
import {Campus} from "../../../../entities/campus";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {RoomService} from "../../../../service/room.service";
import {CampusService} from "../../../../service/campus.service";
import {CameraService} from "../../../../service/camera.service";
import {CameraManagePage} from "../../camera/camera-manage.component";
import {RoomAddPage} from "./room-add.component";
import {School} from "../../../../entities/school";
import {SchoolService} from "../../../../service/school.service";
import {RoomInfoPage} from "./room-info.component";

@Component({
  selector: 'page-room-detail',
  templateUrl: 'room-manage.component.html',
})

export class RoomManagePage{
  roomList : Room[];
  campusList : Campus[];
  schoolList: School[];

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public roomService : RoomService,
              public campusService : CampusService,
              public schoolService: SchoolService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.roomList = roomService.getRoomList();
    this.campusList = campusService.getCampusList();
    this.schoolList = schoolService.getSchoolList();
  }

  showDetail(school:School,campus:Campus,room : Room){
    this.appCtrl.getRootNavs()[0].push(RoomInfoPage,{
      school:school,
      campus:campus,
      room:room,
    });
    // let alert = this.alertCtrl.create({
    //   title: room.campusId + room.name,
    //   //message:"该教室位于" +this.map.get(location.campusId),
    //   buttons: ['确定']
    // });
    // alert.present();
  }

  ionViewDidEnter(){
    this.roomService.updateRoomList().then( rooms => {
      this.roomList = rooms;
    });
    this.campusService.updateCampusList().then( campuses => {
      this.campusList = campuses;
    });
    this.schoolService.updateSchoolList().then( schools => {
      this.schoolList = schools;
    });
    this.roomService.registerPage(this);
    this.campusService.registerPage(this);
    this.schoolService.registerPage(this);
  }

  ionViewDidLeave(){
    this.roomService.removePage(this);
    this.campusService.removePage(this);
    this.schoolService.removePage(this);
  }

  update(){
    this.roomService.updateRoomList().then( rooms =>{
      this.roomList = rooms;
    });
    this.campusService.updateCampusList().then( campuses =>{
      this.campusList = campuses;
    });
    this.schoolService.updateSchoolList().then( schools => {
      this.schoolList = schools;
    });
  }

  addRoom(){
    this.appCtrl.getRootNavs()[0].push(RoomAddPage);
  }

  deleteRoom(room:Room){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除名为"'+room.name+'"的教室?',
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
            this.roomService.deleteRoom(room).then( (data) => {
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
                  subTitle: data == 'error'?'服务器错误，请重试':'该教室还绑定了摄像头或服务器，无法删除，请仔细检查',
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
