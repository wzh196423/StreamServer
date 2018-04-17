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
 * Created by wangziheng on 2017/5/4.
 */
import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, ToastController } from "ionic-angular";
import { LocalUserService } from "../../service/local-user.service";
var HomeNicknameChangePage = /** @class */ (function () {
    function HomeNicknameChangePage(navParams, navCtrl, viewCtrl, toastCtrl, localUserService) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.localUserService = localUserService;
        this.localUser = navParams.get('localUser');
        this.tempName = this.localUser.nickname;
    }
    HomeNicknameChangePage.prototype.saveNickname = function () {
        var _this = this;
        this.localUserService.modifyNickname(this.tempName).then(function (data) {
            if (data === 'success') {
                var toast = _this.toastCtrl.create({
                    message: '修改成功',
                    duration: 1000,
                    position: 'middle'
                });
                toast.onDidDismiss(function () {
                    _this.viewCtrl.dismiss();
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: '修改失败，请重试',
                    duration: 1500,
                    position: 'middle'
                });
                toast.present();
            }
        });
    };
    HomeNicknameChangePage = __decorate([
        Component({
            templateUrl: 'home-nickname-change.component.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            NavController,
            ViewController,
            ToastController,
            LocalUserService])
    ], HomeNicknameChangePage);
    return HomeNicknameChangePage;
}());
export { HomeNicknameChangePage };
//# sourceMappingURL=home-nickname-change.component.js.map