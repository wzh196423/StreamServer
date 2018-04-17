var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupLoginService } from "../../service/signup-login.service";
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, actionSheetCtrl, loadingCtrl, toastCtrl, alertCtrl, signupLoginService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.signupLoginService = signupLoginService;
        this.username = '';
        this.password = '';
        this.nickname = '';
        this.showPsw = false;
    }
    SignupPage.prototype.changeShowPsw = function () {
        this.showPsw = !this.showPsw;
    };
    SignupPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "注册中，请稍等",
        });
        var toast = null;
        loading.present();
        this.signupLoginService.signup(this.username, this.password, this.nickname)
            .then(function (data) {
            if (data === 'success') {
                toast = _this.toastCtrl.create({
                    message: '注册成功',
                    duration: 1500,
                    position: 'middle'
                });
                toast.onDidDismiss(function () {
                    _this.navCtrl.setRoot(LoginPage);
                });
                loading.dismiss();
                toast.present();
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: '注册失败',
                    subTitle: '账号已被注册或服务器错误，请重试',
                    buttons: ['确定']
                });
                loading.dismiss();
                alert_1.present();
            }
        });
    };
    SignupPage = __decorate([
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ActionSheetController,
            LoadingController,
            ToastController,
            AlertController,
            SignupLoginService])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map