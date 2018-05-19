import {Component} from "@angular/core";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {School} from "../../../../entities/school";
import {SchoolService} from "../../../../service/school.service";
import {SchoolAddPage} from "./school-add.component";
import {Room} from "../../../../entities/room";

@Component({
  selector: 'page-school-detail',
  templateUrl: 'school-manage.component.html',
})

export class SchoolManagePage{
  schoolList : School[];

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public schoolService : SchoolService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.schoolList = schoolService.getSchoolList();
  }

  showDetail(school : School){
    let alert = this.alertCtrl.create({
      title: school.name,
      //message:"该教室位于" +this.map.get(location.campusId),
      buttons: ['确定']
    });
    alert.present();
  }

  ionViewDidEnter(){
    this.schoolService.updateSchoolList().then( schools => {
      this.schoolList = schools;
    });
    this.schoolService.registerPage(this);
  }

  ionViewDidLeave(){
    this.schoolService.removePage(this);
  }

  update(){
    this.schoolService.updateSchoolList().then( schools => {
      this.schoolList = schools;
    });
  }

  addSchool(){
    this.appCtrl.getRootNavs()[0].push(SchoolAddPage);
  }

  deleteSchool(school:School){
    let alert = this.alertCtrl.create({
      title: '删除确认',
      message: '确定要删除名为"'+school.name+'"的学校?',
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
            this.schoolService.deleteSchool(school).then( (data) => {
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
                  subTitle: data == 'error'?'服务器错误，请重试':'该学校下还有校区，无法删除，请仔细检查',
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
