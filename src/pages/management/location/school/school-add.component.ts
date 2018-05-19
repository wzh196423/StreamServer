import {Component} from "@angular/core";
import {AlertController, App, LoadingController, NavController, ToastController} from "ionic-angular";
import {SchoolService} from "../../../../service/school.service";
import {School} from "../../../../entities/school";

@Component({
  selector: 'page-school-add',
  templateUrl: 'school-add.component.html',
})

export class SchoolAddPage{
  name:string = '';

  constructor(public appCtrl : App ,
              public navCtrl : NavController,
              public schoolService: SchoolService,
              public loadingCtrl : LoadingController,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController,){
  }

  onSubmit(){
    if (this.name === undefined || this.name === ''){
      let alert = this.alertCtrl.create({
        title: '添加学校失败',
        subTitle: '学校名不能为空，请重新输入',
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
      var temp = new School(this.name);
      this.schoolService.addSchool(temp).then( (data) =>{
        if (data === 'success'){
          toast = this.toastCtrl.create({
            message:"学校添加成功,学校名 :" + this.name,
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
            title: '添加学校失败',
            subTitle: '已有同名学校或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
    }
  }

}
