import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

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
import {RoomManagePage} from "../pages/management/location/room/room-manage.component";
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
import {RoomAddPage} from "../pages/management/location/room/room-add.component";
import {ChannelManagePage} from "../pages/management/channel/channel-manage.component";
import {ChannelAddPage} from "../pages/management/channel/channel-add.component";
import {LiveRoomAddPage} from "../pages/management/channel/live-room-add.component";
import {ServerAddPage} from "../pages/management/server/server-add.component";
import {ServerManagePage} from "../pages/management/server/server-manage.component";
import {ServerService} from "../service/server.service";
import {ChannelDetailPage} from "../pages/live/channel-detail.component";
import {ServerRegisterPage} from "../pages/management/server/server-register.component";
import {RootServerService} from "../service/rootServer.service";
import {LiveServerService} from "../service/liveServer.service";
import {ServerInfoPage} from "../pages/management/server/server-info.component";
import {LiveServerInfoPage} from "../pages/management/server/live-server-info.component";
import {DirectStreamAddPage} from "../pages/management/server/direct-stream-add.component";
import {SchoolService} from "../service/school.service";
import {SchoolAddPage} from "../pages/management/location/school/school-add.component";
import {SchoolManagePage} from "../pages/management/location/school/school-manage.component";
import {CampusAddPage} from "../pages/management/location/campus/campus-add.component";
import {CampusManagePage} from "../pages/management/location/campus/campus-manage.component";
import {RoomInfoPage} from "../pages/management/location/room/room-info.component";
import {CameraDetailPage} from "../pages/management/camera/camera-detail.component";
import {LiveRoomDetailPage} from "../pages/management/channel/live-room-detail.component";
import {DirectStreamDetailPage} from "../pages/management/server/direct-stream-detail.component";
import {LiveRoomWatchPage} from "../pages/management/channel/live-room-watch.component";

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
    CameraDetailPage,
    RoomManagePage,
    RoomAddPage,
    RoomInfoPage,
    SchoolAddPage,
    SchoolManagePage,
    CampusAddPage,
    CampusManagePage,
    ChannelManagePage,
    ChannelAddPage,
    LiveRoomAddPage,
    LiveRoomDetailPage,
    LiveRoomWatchPage,
    ServerManagePage,
    ServerAddPage,
    ServerRegisterPage,
    ServerInfoPage,
    LiveServerInfoPage,
    DirectStreamAddPage,
    DirectStreamDetailPage,
    LoginPage,
    SignupPage,
    ChangePasswordPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
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
    CameraDetailPage,
    RoomManagePage,
    RoomAddPage,
    RoomInfoPage,
    SchoolAddPage,
    SchoolManagePage,
    CampusAddPage,
    CampusManagePage,
    ChannelManagePage,
    ChannelAddPage,
    LiveRoomAddPage,
    LiveRoomDetailPage,
    LiveRoomWatchPage,
    ServerManagePage,
    ServerAddPage,
    ServerRegisterPage,
    ServerInfoPage,
    LiveServerInfoPage,
    DirectStreamAddPage,
    DirectStreamDetailPage,
    LoginPage,
    SignupPage,
    ChangePasswordPage,
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
    LiveServerService,
    SchoolService
  ]
})
export class AppModule {}
