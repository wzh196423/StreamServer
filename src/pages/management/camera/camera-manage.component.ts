import {Component} from '@angular/core';
import {App, NavController, LoadingController, AlertController, ToastController} from "ionic-angular";
import {Campus} from "../../../entities/campus";
import {Room} from "../../../entities/room";
import {RoomService} from "../../../service/room.service";
import {CampusService} from "../../../service/campus.service";
import {CameraService} from "../../../service/camera.service";
import {Camera} from "../../../entities/camera";
import {CameraAddPage} from "./camera-add.component";
import {School} from "../../../entities/school";
import {SchoolService} from "../../../service/school.service";
import {DirectStreamService} from "../../../service/directStream.service";
import {DirectStream} from "../../../entities/directStream";
import {CameraDetailPage} from "./camera-detail.component";
/**
 * Created by wangziheng on 2018/3/24.
 */
@Component({
  selector: 'page-camera-detail',
  templateUrl: 'camera-manage.component.html',
})

export class CameraManagePage{
  schoolList: School[];
  campusList : Campus[];
  roomList : Room[];
  campusId : number;
  cameraList : Camera[];
  roomListByCampus: Room[];
  directStreamList: DirectStream[];
  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public schoolService: SchoolService,
              public roomService : RoomService,
              public campusService : CampusService,
              public cameraService : CameraService,
              public directStreamService: DirectStreamService,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController){
    this.schoolList = schoolService.getSchoolList();
    this.campusList = campusService.getCampusList();
    this.roomList = roomService.getRoomList();
    this.roomListByCampus = this.roomList;
    this.cameraList = cameraService.getCameraList();
    this.directStreamList = directStreamService.getDirectStreamList();
  }

  getCameraByCampus(c:Campus){
    var result:Camera[] = [];
    for(let r of this.roomList){
      if (r.campusId == c.id){
        for (let camera of this.cameraList){
          if (camera.roomId == r.id)
            result.push(camera);
        }
      }
    }
    return result;
  }

  showStreamUrl(camera:Camera){
    if (camera.directStreamId == null || camera.directStreamId == undefined)
      return '';
    else {
      let temp:DirectStream = this.directStreamService.getDirectStreamById(camera.directStreamId);
      if (temp == undefined)
        return '';
      else
        return temp.url;
    }
  }

  getRoomNameByRoomId(id:number){
    for(let room of this.roomList){
      if(room.id == id)
        return room.name;
    }
    return '';
  }

  ionViewDidEnter(){
    this.roomService.updateRoomList().then( rooms =>{
      this.roomList = rooms;
      this.roomListByCampus = this.roomList;
    });
    this.cameraService.updateCameraList().then(cameras => {
      this.cameraList = cameras;
    });
    this.campusService.updateCampusList().then( campuses => {
      this.campusList = campuses;
    });
    this.schoolService.updateSchoolList().then(schools => {
      this.schoolList = schools;
    });
    this.directStreamService.updateDirectStreamList().then(streams => {
      this.directStreamList = streams;
    });
    this.directStreamService.registerPage(this);
    this.schoolService.registerPage(this);
    this.cameraService.registerPage(this);
    this.roomService.registerPage(this);
    this.campusService.registerPage(this);
  }

  ionViewDidLeave(){
    this.schoolService.removePage(this);
    this.cameraService.removePage(this);
    this.roomService.removePage(this);
    this.campusService.removePage(this);
    this.directStreamService.removePage(this);
  }

  update(){
    this.cameraService.updateCameraList().then(cameras =>{
      this.cameraList = cameras;
    });
  }

  addCamera(){
    this.appCtrl.getRootNavs()[0].push(CameraAddPage);
  }

  showDetail(camera:Camera,campus:Campus,school:School){
    this.appCtrl.getRootNavs()[0].push(CameraDetailPage,{
      camera:camera,
      campusName:campus.name,
      schoolName:school.name,
      roomName:this.roomList.find(item => {
        return item.id == camera.roomId;
      }).name,
      streamUrl:this.showStreamUrl(camera)
    })
  }

  deleteCamera(camera:Camera){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除序列号为"'+camera.serialNumber+'"的摄像头?',
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
            this.cameraService.deleteCamera(camera).then( (data) => {
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
                  subTitle: '服务器错误，请重试',
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

