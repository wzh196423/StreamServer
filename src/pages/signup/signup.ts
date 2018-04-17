import {Component} from '@angular/core';
import {
  NavController, NavParams,
  LoadingController, ActionSheetController,
  AlertController, ToastController
} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {SignupLoginService} from "../../service/signup-login.service";

import {User} from "../../entities/user";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username: string;
  password: string;
  nickname: string;
  showPsw: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public signupLoginService: SignupLoginService) {
    this.username = '';
    this.password = '';
    this.nickname = '';
    this.showPsw = false;
  }

  changeShowPsw() {
    this.showPsw = !this.showPsw;
  }

  onSubmit() {
    let loading = this.loadingCtrl.create({
      content: "注册中，请稍等",
    });
    var toast = null;
    loading.present();
    this.signupLoginService.signup(this.username, this.password, this.nickname)
      .then((data) => {
        if (data === 'success') {// 注册成功
            toast = this.toastCtrl.create({
              message: '注册成功',
              duration: 1500,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
              this.navCtrl.setRoot(LoginPage);
            });
            loading.dismiss();
            toast.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: '注册失败',
            subTitle: '账号已被注册或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      });
  }

}
