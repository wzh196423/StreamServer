import {Component} from "@angular/core";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {SchoolService} from "../../../../service/school.service";
import {School} from "../../../../entities/school";
import {CampusService} from "../../../../service/campus.service";
import {Campus} from "../../../../entities/campus";

@Component({
  selector: 'page-campus-add',
  templateUrl: 'campus-add.component.html',
})

export class CampusAddPage{
  schoolList:School[];
  name:string = '';
  schoolId:number = undefined;

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public schoolService: SchoolService,
              public campusService: CampusService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
    this.schoolList = schoolService.getSchoolList();
  }

  onSubmit(){
    if (this.name === undefined || this.name === ''){
      let alert = this.alertCtrl.create({
        title: '添加校区失败',
        subTitle: '校区名不能为空，请重新输入',
        buttons: ['确定']
      });
      alert.present();
    }else if (this.schoolId == undefined){
      let alert = this.alertCtrl.create({
        title: '添加校区失败',
        subTitle: '校区所在学校不能为空，请重新选择',
        buttons: ['确定']
      });
      alert.present();
    }else{
      let loading = this.loadingCtrl.create({
        content: "添加中，请稍等",
        duration : 2000
      });
      loading.present();
      var toast = null;
      var temp = new Campus(this.name,this.schoolId);
      this.campusService.addCampus(temp).then( (data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"校区添加成功,校区名 :" + this.name+' ,位于'+this.schoolService.getSchoolById(this.schoolId).name,
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
            title: '添加校区失败',
            subTitle: '该学校已有同名校区或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }

}
