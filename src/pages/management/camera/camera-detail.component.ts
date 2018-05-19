import {Component} from "@angular/core";
import {Camera} from "../../../entities/camera";
import {AlertController, App, LoadingController, NavParams, ToastController} from "ionic-angular";
import {DirectStreamService} from "../../../service/directStream.service";
import {CameraService} from "../../../service/camera.service";
import {DirectStream} from "../../../entities/directStream";
import {Campus} from "../../../entities/campus";

@Component({
  selector:'page-camera-detail',
  templateUrl:'camera-detail.component.html'
})

export class CameraDetailPage{
  camera:Camera;
  campusName:string;
  schoolName:string;
  roomName:string;
  bindStreamId: number;
  streamUrl:string;
  newStatus:boolean;
  directStreamList:DirectStream[];
  constructor(public navParam: NavParams,
              public directStreamService: DirectStreamService,
              public cameraService: CameraService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,
              public appCtrl: App){
    this.camera = navParam.get('camera');
    this.campusName = navParam.get('campusName');
    this.schoolName = navParam.get('schoolName');
    this.roomName = navParam.get('roomName');
    this.streamUrl = navParam.get('streamUrl');
    this.directStreamList = directStreamService.getDirectStreamList();
    this.newStatus = this.camera.status;

  }
  ionViewDidEnter(){
    this.directStreamService.updateDirectStreamList().then(streams => {
      this.directStreamList = streams;
    });
    this.directStreamService.registerPage(this);
  }

  ionViewDidLeave(){
    this.directStreamService.removePage(this);
  }

  update(){
    this.directStreamService.updateDirectStreamList().then(streams => {
      this.directStreamList = streams;
    });
  }

  submitSwitch(loading:any){
    var toast = null;
    this.cameraService.modifyStatus(this.camera,this.newStatus)
      .then(res => {
        if (res === 'success'){
          toast = this.toastCtrl.create({
            message:"摄像头信息修改成功,cameraId :" +this.camera.id + ",directStreamId : "+ this.bindStreamId+", new status :"+this.newStatus,
            duration:2000,
            position:'middle',
          });
          toast.onDidDismiss(() => {
            this.appCtrl.navPop();
          });
          loading.dismiss();
          toast.present();
        }else {
          let alert = this.alertCtrl.create({
            title: '摄像头状态修改失败',
            subTitle: '服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
  }

  onSubmit(){
    let loading = this.loadingCtrl.create({
      content: "注册中，请稍等",
      duration : 2000
    });
    loading.present();
    if (this.bindStreamId==undefined || this.bindStreamId == this.camera.directStreamId){
      this.submitSwitch(loading);
    }else{
      loading.present();
      var toast = null;
      this.cameraService.bindDirectStream(this.camera,this.bindStreamId==-1?null:this.bindStreamId)
        .then( data => {
          if (data === 'success'){
            if (this.newStatus == this.camera.status){
              toast = this.toastCtrl.create({
                message:"摄像头信息修改成功,cameraId :" +this.camera.id + ",directStreamId : "+ this.bindStreamId,
                duration:2000,
                position:'middle',
              });
              toast.onDidDismiss(() => {
                this.appCtrl.navPop();
              });
              loading.dismiss();
              toast.present();
            }else {
              this.submitSwitch(loading);
            }
          }else{
            let alert = this.alertCtrl.create({
              title: '摄像头绑定直播流失败',
              subTitle: '服务器错误，请重试',
              buttons: ['确定']
            });
            loading.dismiss();
            alert.present();
          }
        })
    }


  }


}
