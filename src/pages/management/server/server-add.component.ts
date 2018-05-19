import {Component} from "@angular/core";
import {Campus} from "../../../entities/campus";
import {Room} from "../../../entities/room";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {CampusService} from "../../../service/campus.service";
import {RoomService} from "../../../service/room.service";
import {CameraService} from "../../../service/camera.service";
import {Camera} from "../../../entities/camera";
import {Server} from "../../../entities/server";
import {ServerService} from "../../../service/server.service";

@Component({
    selector: 'page-server-detail',
    templateUrl: 'server-add.component.html'
})

export class ServerAddPage{
  ip:string = '';
  brand:string = '';
  registerTime:Date = new Date();
  description:string = '';
  storage:number;
  usedStorage:number;
  cores:number;
  memory:number;
  campusList : Campus[];
  roomList : Room[];
  roomListByCampus: Room[];
  campusId : number;
  roomId : number;
  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public roomService : RoomService,
              public campusService : CampusService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,
              public serverService: ServerService){
    this.roomList = roomService.getRoomList();
    this.roomListByCampus = this.roomList;
    this.campusList = campusService.getCampusList();
  }

  getRoomsByCampusId(campusId : number){
    let result:Room[] = [];
    for(let r of this.roomList){
      if (r.campusId == campusId){
        result.push(r);
      }
    }
    return result;

  }
  updateRoomByCampus(){
    this.roomListByCampus = this.getRoomsByCampusId(this.campusId);
  }

  onSubmit(){
    if (this.ip === ''){
      let alert = this.alertCtrl.create({
        title: '注册服务器失败',
        subTitle: 'ip地址不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.brand === ''){
      let alert = this.alertCtrl.create({
        title: '注册服务器失败',
        subTitle: '服务器品牌不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.storage === undefined || this.storage == 0) {
      let alert = this.alertCtrl.create({
        title: '注册服务器失败',
        subTitle: '服务器存储空间值不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.usedStorage === null || this.usedStorage === undefined) {
      let alert = this.alertCtrl.create({
        title: '注册服务器失败',
        subTitle: '服务器已使用空间值不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else if (this.cores === null || this.cores === undefined) {
      let alert = this.alertCtrl.create({
        title: '注册服务器失败',
        subTitle: '服务器CPU核数不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else if (this.memory === null || this.memory === undefined) {
      let alert = this.alertCtrl.create({
        title: '注册服务器失败',
        subTitle: '服务器内存数值不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    } else if (this.roomId === undefined){
      let alert = this.alertCtrl.create({
        title: '注册服务器失败',
        subTitle: '服务器所在教室不能为空，请重新选择',
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
      let temp = new Server(this.ip,this.brand,new Date(),this.description,this.storage,this.usedStorage,this.cores,this.memory,this.roomId);
      this.serverService.addServer(temp).then((data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"服务器注册成功,ip :" +this.ip + ",brand :" + this.brand + ", location :" +this.roomId,
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
            subTitle: '已有同名ip的服务器或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }


}
