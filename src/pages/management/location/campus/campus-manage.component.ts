import {Component} from "@angular/core";
import {Campus} from "../../../../entities/campus";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {CampusService} from "../../../../service/campus.service";
import {School} from "../../../../entities/school";
import {SchoolService} from "../../../../service/school.service";
import {CampusAddPage} from "./campus-add.component";

@Component({
  selector: 'page-campus-detail',
  templateUrl: 'campus-manage.component.html',
})

export class CampusManagePage{
  campusList : Campus[];
  schoolList: School[];

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public campusService : CampusService,
              public schoolService: SchoolService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.campusList = campusService.getCampusList();
    this.schoolList = schoolService.getSchoolList();
  }

  showDetail(campus : Campus){
    let alert = this.alertCtrl.create({
      title: campus.name,
      message:"该校区位于" +this.schoolService.getSchoolById(campus.schoolId).name,
      buttons: ['确定']
    });
    alert.present();
  }

  ionViewDidEnter(){
    this.schoolService.updateSchoolList().then( schools => {
      this.schoolList = schools;
    });
    this.campusService.updateCampusList().then( campuses => {
      this.campusList = campuses;
    });
    this.campusService.registerPage(this);
    this.schoolService.registerPage(this);
  }

  ionViewDidLeave(){
    this.campusService.removePage(this);
    this.schoolService.removePage(this);
  }

  update(){
    this.schoolService.updateSchoolList().then( schools => {
      this.schoolList = schools;
    });
    this.campusService.updateCampusList().then( campuses => {
      this.campusList = campuses;
    });
  }

  addCampus(){
    this.appCtrl.getRootNavs()[0].push(CampusAddPage);
  }

  deleteCampus(campus:Campus){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除名为"'+campus.name+'"的校区?',
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
            this.campusService.deleteCampus(campus).then( (data) => {
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
                  subTitle: data == 'error'?'服务器错误，请重试':'该校区下还存在教室，无法删除，请仔细检查',
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
