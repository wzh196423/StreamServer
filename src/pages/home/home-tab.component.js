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
import { App, NavController } from 'ionic-angular';
import { LocalUserService } from "../../service/local-user.service";
import { SocketService } from "../../service/socket.service";
import { HomeNicknameChangePage } from "./home-nickname-change.component";
var HomeTabPage = /** @class */ (function () {
    function HomeTabPage(navCtrl, localUserService, appCtrl, socketService) {
        this.navCtrl = navCtrl;
        this.localUserService = localUserService;
        this.appCtrl = appCtrl;
        this.socketService = socketService;
        this.localUser = localUserService.getLocalUser();
    }
    /**
     * 点击后进入修改昵称的界面
     */
    HomeTabPage.prototype.changeNickname = function () {
        this.appCtrl.getRootNav().push(HomeNicknameChangePage, {
            localUser: this.localUser
        });
    };
    /**
     * 退出账号的点击事件
     */
    HomeTabPage.prototype.cancelAccount = function () {
        var _this = this;
        this.socketService.emitPromise('logout', this.localUser.username)
            .then(function () {
            _this.socketService.getSocket().disconnect();
            _this.socketService.setSocketNull();
            //this.navCtrl.setRoot(StartPage);
        })
            .catch(function (error) {
            console.log('AboutUserInfoPage-cancelAccount:', error);
        });
    };
    HomeTabPage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home-tab.component.html'
        }),
        __metadata("design:paramtypes", [NavController,
            LocalUserService,
            App,
            SocketService])
    ], HomeTabPage);
    return HomeTabPage;
}());
export { HomeTabPage };
//# sourceMappingURL=home-tab.component.js.map