import {Component} from "@angular/core";
import {Room} from "../../../../entities/room";
import {Campus} from "../../../../entities/campus";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {RoomService} from "../../../../service/room.service";
import {CampusService} from "../../../../service/campus.service";
import {CameraService} from "../../../../service/camera.service";
import {CameraManagePage} from "../../camera/camera-manage.component";
import {School} from "../../../../entities/school";
import {SchoolService} from "../../../../service/school.service";

@Component({
  selector: 'page-room-add',
  templateUrl: 'room-add.component.html',
})

export class RoomAddPage{

  schoolList: School[];
  campusList : Campus[];
  campusListBySchool: Campus[];
  name : string = '';
  campusId :number = undefined;
  schoolId : number = undefined;
  map: Map<number,string>;// campus id-name 的映射

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public roomService : RoomService,
              public schoolService: SchoolService,
              public campusService : CampusService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.schoolList = schoolService.getSchoolList();
    this.campusList = this.campusService.getCampusList();
    this.campusListBySchool = this.campusList;
    this.map = new Map<number, string>();
    for(let c of this.campusList){
      this.map.set(c.id,c.name);
    }
  }

  onSubmit(){
    if (this.schoolId === null || this.schoolId === undefined){
      let alert = this.alertCtrl.create({
        title: '添加教室失败',
        subTitle: '学校不能为空，请重新选择',
        buttons: ['确定']
      });
      alert.present();
    }else if (this.campusId === null || this.campusId === undefined){
      let alert = this.alertCtrl.create({
        title: '添加教室失败',
        subTitle: '校区不能为空，请重新选择',
        buttons: ['确定']
      });
      alert.present();
    }else if(this.name === undefined || this.name === ''){
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
      var temp = new Room(this.name,this.campusId);
      this.roomService.addRoom(temp).then( (data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"教室添加成功,校区 :" +this.campusId + ",教室名 :" + this.name,
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

  updateCampusBySchool(){
    this.campusListBySchool = this.campusList.filter(item => {
      return item.schoolId == this.schoolId;
    })
  };

}
