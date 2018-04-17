import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';

import { LiveTabPage } from '../pages/live/live-tab.component';
import { ManagementTabPage } from '../pages/management/management-tab.component';
import { HomeTabPage } from '../pages/home/home-tab.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RoomService} from "../service/room.service";
import {CameraManagePage} from "../pages/management/camera/camera-manage.component";
import {CameraService} from "../service/camera.service";
import {CampusService} from "../service/campus.service";
import {RoomManagePage} from "../pages/management/room/room-manage.component";
import {LocalUserService} from "../service/local-user.service";
import {SocketService} from "../service/socket.service";
import {HomeNicknameChangePage} from "../pages/home/home-nickname-change.component";
import {LoginPage} from "../pages/login/login";
import {SignupLoginService} from "../service/signup-login.service";
import {SignupPage} from "../pages/signup/signup";
import {ChangePasswordPage} from "../pages/login/change-password.component";
import {ChannelService} from "../service/channel.service";
import {DirectStreamService} from "../service/directStream.service";
import {LiveRoomService} from "../service/liveRoom.service";
import {CameraAddPage} from "../pages/management/camera/camera-add.component";
import {RoomAddPage} from "../pages/management/room/room-add.component";
import {ChannelManagePage} from "../pages/management/channel/channel-manage.component";
import {ChannelAddPage} from "../pages/management/channel/channel-add.component";
import {LiveRoomAddPage} from "../pages/management/channel/liveRoom-add.component";
import {ServerAddPage} from "../pages/management/server/server-add.component";
import {ServerManagePage} from "../pages/management/server/server-manage.component";
import {ServerService} from "../service/server.service";
import {ChannelDetailPage} from "../pages/live/channel-detail.component";
import {ServerRegisterPage} from "../pages/management/server/server-register.component";
import {RootServerService} from "../service/rootServer.service";
import {LiveServerService} from "../service/liveServer.service";
import {ServerInfoPage} from "../pages/management/server/server-info.component";

@NgModule({
  declarations: [
    MyApp,
    LiveTabPage,
    ChannelDetailPage,
    ManagementTabPage,
    HomeTabPage,
    HomeNicknameChangePage,
    TabsPage,
    CameraManagePage,
    CameraAddPage,
    RoomManagePage,
    RoomAddPage,
    ChannelManagePage,
    ChannelAddPage,
    LiveRoomAddPage,
    ServerManagePage,
    ServerAddPage,
    ServerRegisterPage,
    ServerInfoPage,
    LoginPage,
    SignupPage,
    ChangePasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LiveTabPage,
    ChannelDetailPage,
    ManagementTabPage,
    HomeTabPage,
    HomeNicknameChangePage,
    TabsPage,
    CameraManagePage,
    CameraAddPage,
    RoomManagePage,
    RoomAddPage,
    ChannelManagePage,
    ChannelAddPage,
    LiveRoomAddPage,
    ServerManagePage,
    ServerAddPage,
    ServerRegisterPage,
    ServerInfoPage,
    LoginPage,
    SignupPage,
    ChangePasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomService,
    CameraService,
    CampusService,
    LocalUserService,
    SocketService,
    SignupLoginService,
    ChannelService,
    DirectStreamService,
    LiveRoomService,
    ServerService,
    RootServerService,
    LiveServerService
  ]
})
export class AppModule {}
