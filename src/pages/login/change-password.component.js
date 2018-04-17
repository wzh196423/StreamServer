var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by wangziheng on 2017/6/14.
 */
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { SignupLoginService } from "../../service/signup-login.service";
import { LoginPage } from '../login/login';
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(alertCtrl, signupLoginService, toastCtrl, navCtrl, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.signupLoginService = signupLoginService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.username = '';
        this.oldPsw = '';
        this.newPsw = '';
        this.newPswAgain = '';
    }
    ChangePasswordPage.prototype.onSubmit = function () {
        var _this = this;
        if (this.newPsw === this.oldPsw) {
            var toast = this.toastCtrl.create({
                message: '新旧密码不能相同',
                duration: 1500,
                position: 'middle'
            });
            toast.onDidDismiss(function () {
                document.getElementById('new').getElementsByTagName('input')[0].focus();
                _this.newPsw = '';
            });
            toast.present();
            return;
        }
        if (this.newPsw !== this.newPswAgain) {
            var toast = this.toastCtrl.create({
                message: '两次密码不一致',
                duration: 1500,
                position: 'middle'
            });
            toast.onDidDismiss(function () {
                document.getElementById('newAgain').getElementsByTagName('input')[0].focus();
                _this.newPswAgain = '';
            });
            toast.present();
            return;
        }
        var loading = this.loadingCtrl.create({
            content: "修改中，请稍等",
        });
        loading.present();
        this.signupLoginService.changePassword(this.username, this.oldPsw, this.newPsw)
            .then(function (res) {
            if (res === 'success') {
                var toast = _this.toastCtrl.create({
                    message: '修改密码成功',
                    duration: 1500,
                    position: 'middle'
                });
                toast.onDidDismiss(function () {
                    _this.navCtrl.setRoot(LoginPage);
                });
                loading.dismiss();
                toast.present();
            }
            else if (res === 'wrong') {
                document.getElementById('old').getElementsByTagName('input')[0].focus();
                var alert_1 = _this.alertCtrl.create({
                    title: '修改密码失败',
                    subTitle: '账号和原始密码不匹配',
                    buttons: ['确定']
                });
                loading.dismiss();
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: '修改密码失败',
                    subTitle: '请重试',
                    buttons: ['确定']
                });
                loading.dismiss();
                alert_2.present();
            }
        });
    };
    ChangePasswordPage = __decorate([
        Component({
            selector: 'page-change-password',
            templateUrl: 'change-password.component.html',
        }),
        __metadata("design:paramtypes", [AlertController,
            SignupLoginService,
            ToastController,
            NavController,
            LoadingController])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());
export { ChangePasswordPage };
//# sourceMappingURL=change-password.component.js.map