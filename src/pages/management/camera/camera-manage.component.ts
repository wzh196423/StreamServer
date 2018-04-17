import {Component} from '@angular/core';
import {App, NavController, LoadingController, AlertController, ToastController} from "ionic-angular";
import {Campus} from "../../../entities/campus";
import {Room} from "../../../entities/room";
import {RoomService} from "../../../service/room.service";
import {CampusService} from "../../../service/campus.service";
import {CameraService} from "../../../service/camera.service";
import {Camera} from "../../../entities/camera";
import {CameraAddPage} from "./camera-add.component";
/**
 * Created by wangziheng on 2018/3/24.
 */
@Component({
  selector: 'page-camera-detail',
  templateUrl: 'camera-manage.component.html',
})

export class CameraManagePage{
  campusList : Campus[];
  roomList : Room[];
  campusId : number;
  cameraList : Camera[];
  roomListByCampus: Room[];
  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public roomService : RoomService,
              public campusService : CampusService,
              public cameraService : CameraService,){
    this.roomList = roomService.getRoomList();
    this.roomListByCampus = this.roomList;
    this.campusList = campusService.getCampusList();
    this.cameraList = cameraService.getCameraList();
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

  getRoomNameByRoomId(id:number){
    for(let room of this.roomList){
      if(room.id == id)
        return room.name;
    }
    return '';
  }

  // getRoomsByCampusId(campusId : number){
  //   let result:Room[] = [];
  //   for(let r of this.roomList){
  //     if (r.campusId == campusId){
  //       result.push(r);
  //     }
  //   }
  //   return result;
  //
  // }
  // updateRoomByCampus(){
  //   this.roomListByCampus = this.getRoomsByCampusId(this.campusId);
  // }

  ionViewDidEnter(){
    this.roomService.updateRoomList().then( rooms =>{
      this.roomList = rooms;
      this.roomListByCampus = this.roomList;
    })
    this.cameraService.updateCameraList().then(cameras => {
      this.cameraList = cameras;
    })
    this.campusService.updateCampusList().then( campuses => {
      this.campusList = campuses;
    })
    this.cameraService.registerPage(this);
    this.roomService.registerPage(this);
    this.campusService.registerPage(this);
  }

  ionViewDidLeave(){
    this.cameraService.removePage(this);
    this.roomService.removePage(this);
    this.campusService.removePage(this);
  }

  update(){
    this.cameraService.updateCameraList().then(cameras =>{
      this.cameraList = cameras;
    })
  }

  addCamera(){
    this.navCtrl.push(CameraAddPage);
  }

  // onSubmit(){
  //   if (this.serialNumber === ''){
  //     let alert = this.alertCtrl.create({
  //       title: '注册摄像头失败',
  //       subTitle: '序列号不能为空，请重新输入',
  //       buttons: ['确定']
  //     });
  //     alert.present();
  //   } else if (this.brand === ''){
  //     let alert = this.alertCtrl.create({
  //       title: '注册摄像头失败',
  //       subTitle: '摄像头品牌不能为空，请重新输入',
  //       buttons: ['确定']
  //     });
  //     alert.present();
  //   } else if (this.model === '') {
  //     let alert = this.alertCtrl.create({
  //       title: '注册摄像头失败',
  //       subTitle: '摄像头型号不能为空，请重新输入',
  //       buttons: ['确定']
  //     });
  //     alert.present();
  //   } else if (this.ip === '') {
  //     let alert = this.alertCtrl.create({
  //       title: '注册摄像头失败',
  //       subTitle: '摄像头ip地址不能为空，请重新输入',
  //       buttons: ['确定']
  //     });
  //     alert.present();
  //   } else {
  //     let loading = this.loadingCtrl.create({
  //       content: "注册中，请稍等",
  //       duration : 2000
  //     });
  //     loading.present();
  //     var toast = null;
  //     let temp = new Camera(this.brand,this.model,this.serialNumber,this.ip,new Date(),false,this.roomId,'',this.cameraList.length+1);
  //     this.cameraService.addCamera(temp).then((data) =>{
  //       if (data === 'success'){
  //         toast = this.toastCtrl.create({
  //           message:"摄像头注册成功,serialNum :" +this.serialNumber + ",ip :" + this.ip + ", campus :" + this.campusId + ", room :" +this.roomId,
  //           duration:2000,
  //           position:'middle',
  //         });
  //         toast.onDidDismiss(() => {
  //           this.appCtrl.navPop();
  //           this.appCtrl.getRootNav().push(CameraManagePage)
  //         });
  //         loading.dismiss();
  //         toast.present();
  //       }else{
  //         let alert = this.alertCtrl.create({
  //           title: '注册失败',
  //           subTitle: '摄像头已被注册或服务器错误，请重试',
  //           buttons: ['确定']
  //         });
  //         loading.dismiss();
  //         alert.present();
  //       }
  //     })
  //   }
  // }
}

