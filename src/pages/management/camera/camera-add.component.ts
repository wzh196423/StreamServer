import {Component} from '@angular/core';
import {App, NavController, LoadingController, AlertController, ToastController} from "ionic-angular";
import {Campus} from "../../../entities/campus";
import {Room} from "../../../entities/room";
import {RoomService} from "../../../service/room.service";
import {CampusService} from "../../../service/campus.service";
import {Camera} from "../../../entities/camera";
import {CameraService} from "../../../service/camera.service";
import {School} from "../../../entities/school";
import {SchoolService} from "../../../service/school.service";
import {DirectStream} from "../../../entities/directStream";
import {DirectStreamService} from "../../../service/directStream.service";
/**
 * Created by wangziheng on 2018/3/24.
 */
@Component({
  selector: 'page-camera-add',
  templateUrl: 'camera-add.component.html',
})

export class CameraAddPage{
  schoolList: School[];
  campusList : Campus[];
  roomList : Room[];
  directStreamList: DirectStream[];
  brand:string;
  model:string;
  serialNumber : string;
  ip : string;
  campusId : number;
  roomId : number;
  schoolId: number = undefined;
  campusListBySchool:Campus[];
  roomListByCampus: Room[];
  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public schoolService: SchoolService,
              public roomService : RoomService,
              public campusService : CampusService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,
              public cameraService: CameraService){
    this.schoolList = schoolService.getSchoolList();
    this.campusList = campusService.getCampusList();
    this.campusListBySchool = this.campusList;
    this.roomList = roomService.getRoomList();
    this.roomListByCampus = this.roomList;
    this.brand = '';
    this.model = '';
    this.serialNumber = '';
    this.ip = '';
  }

  updateCampusBySchool(){
    this.campusListBySchool = this.campusList.filter(item => {
      return item.schoolId == this.schoolId;
    })
  }

  updateRoomByCampus(){
    this.roomListByCampus = this.roomList.filter(item => {
      return item.campusId == this.campusId;
    })
  }

  onSubmit(){
    if (this.serialNumber === ''){
      let alert = this.alertCtrl.create({
        title: '注册摄像头失败',
        subTitle: '序列号不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.brand === ''){
      let alert = this.alertCtrl.create({
        title: '注册摄像头失败',
        subTitle: '摄像头品牌不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.model === '') {
      let alert = this.alertCtrl.create({
        title: '注册摄像头失败',
        subTitle: '摄像头型号不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.ip === '') {
      let alert = this.alertCtrl.create({
        title: '注册摄像头失败',
        subTitle: '摄像头ip地址不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.roomId === undefined){
      let alert = this.alertCtrl.create({
        title: '注册摄像头失败',
        subTitle: '摄像头所在教室不能为空，请重新选择',
        buttons: ['确定']
      });
      alert.present();
    } else {
      let loading = this.loadingCtrl.create({
        content: "注册中，请稍等",
        duration : 2000
      });
      loading.present();
      var toast = null;
      let temp = new Camera(this.brand,this.model,this.serialNumber,this.ip,new Date(),false,this.roomId,undefined);
      this.cameraService.addCamera(temp).then((data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"摄像头注册成功,serialNum :" +this.serialNumber + ",ip :" + this.ip + ", campus :" + this.campusId + ", location :" +this.roomId,
            duration:2000,
            position:'middle',
          });
          toast.onDidDismiss(() => {
            this.appCtrl.navPop();
          });
          loading.dismiss();
          toast.present();
        }else{
          let alert = this.alertCtrl.create({
            title: '注册失败',
            subTitle: '摄像头已被注册或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }
}

