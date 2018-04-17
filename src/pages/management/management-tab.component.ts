import { Component } from '@angular/core';
import { NavController , App} from 'ionic-angular';
import {CameraManagePage} from "./camera/camera-manage.component";
import {RoomManagePage} from "./room/room-manage.component";
import {ChannelManagePage} from "./channel/channel-manage.component";
import {ServerManagePage} from "./server/server-manage.component";

@Component({
  selector: 'page-management',
  templateUrl: 'management-tab.component.html'
})
export class ManagementTabPage {
  things : string[];
  pages: any[];
  constructor(public navCtrl: NavController,
              public appCtrl: App) {
    //this.things = new string[0];
    this.things = [];
    this.pages = [];
    this.things.push('摄像头管理');
    this.pages.push(CameraManagePage);

    // this.things.push('校区管理');
    // this.pages.push(CameraManagePage);

    this.things.push('教室管理');
    this.pages.push(RoomManagePage);

    this.things.push('直播频道管理');
    this.pages.push(ChannelManagePage);

    this.things.push('服务器管理');
    this.pages.push(ServerManagePage);

  }

  showDetail(thing: string) {
    // if (thing === '摄像头管理') {
    //   this.appCtrl.getRootNav().push(CameraManagePage)
    // }else if (thing === '教室管理') {
    //   this.appCtrl.getRootNav().push(RoomManagePage)
    // }
    console.log(this.things.indexOf(thing));
    this.navCtrl.push(this.pages[this.things.indexOf(thing)]);
  }

}
