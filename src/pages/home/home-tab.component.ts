import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {User} from "../../entities/user";
import {LocalUserService} from "../../service/local-user.service";
import {SocketService} from "../../service/socket.service";
import {HomeNicknameChangePage} from "./home-nickname-change.component";

@Component({
  selector: 'page-home',
  templateUrl: 'home-tab.component.html'
})
export class HomeTabPage {

  localUser: User;        // 当前的玩家

  constructor(public navCtrl: NavController,
              public localUserService: LocalUserService,
              public appCtrl: App,
              public socketService: SocketService,) {
    this.localUser = localUserService.getLocalUser();
  }

  /**
   * 点击后进入修改昵称的界面
   */
  changeNickname() {
    this.appCtrl.getRootNav().push(HomeNicknameChangePage, {
      localUser: this.localUser
    });
  }

  /**
   * 退出账号的点击事件
   */
  cancelAccount() {
    this.socketService.emitPromise('logout', this.localUser.username)
      .then(() => {
        this.socketService.getSocket().disconnect();
        this.socketService.setSocketNull();
        //this.navCtrl.setRoot(StartPage);
      })
      .catch(error => {
        console.log('AboutUserInfoPage-cancelAccount:', error);
      });
  }

}
