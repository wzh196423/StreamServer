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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StartPage } from "../start/start";
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from "../signup/signup";
import { SignupLoginService } from '../../service/signup-login.service';
import { LocalUserService } from "../../service/local-user.service";
import { SocketService } from "../../service/socket.service";
import { ChangePasswordPage } from "./change-password.component";
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, loadingCtrl, localUserService, signupLoginService, socketService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.localUserService = localUserService;
        this.signupLoginService = signupLoginService;
        this.socketService = socketService;
        this.username = this.navParams.get('username') || '';
        this.password = '';
        this.showPsw = false;
    }
    LoginPage.prototype.changeShowPsw = function () {
        this.showPsw = !this.showPsw;
    };
    LoginPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "登录中，请稍等",
        });
        loading.present();
        this.signupLoginService.login(this.username, this.password).then(function (user) {
            if (typeof user === 'object') {
                loading.dismiss();
                _this.navCtrl.setRoot(TabsPage);
                // 开始监听logout事件，一旦有人登录相同账号，此账号被迫退出
                _this.socketService.getSocket().on('logout', function () {
                    _this.socketService.getSocket().disconnect();
                    _this.socketService.setSocketNull();
                    var alert = _this.alertCtrl.create({
                        title: '警告',
                        subTitle: '相同账号在另一个设备上登录',
                        buttons: ['确定']
                    });
                    alert.present();
                    _this.navCtrl.setRoot(StartPage);
                });
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: '登录失败',
                    subTitle: '账号或密码错误，请检查后重试',
                    buttons: ['确定']
                });
                loading.dismiss();
                alert_1.present();
            }
        }).catch(function (error) {
            console.log('LoginPage-onSubmit', error);
        });
    };
    LoginPage.prototype.gotoRegister = function () {
        this.navCtrl.push(SignupPage);
    };
    LoginPage.prototype.forget = function () {
        this.navCtrl.push(ChangePasswordPage);
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            LoadingController,
            LocalUserService,
            SignupLoginService,
            SocketService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map