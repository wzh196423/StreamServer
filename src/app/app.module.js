var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { LivePage } from '../pages/live/live';
import { ManagementTabPage } from '../pages/management/management-tab.component';
import { HomeTabPage } from '../pages/home/home-tab.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RoomService } from "../service/room.service";
import { CameraDetailPage } from "../pages/management/camera-detail.component";
import { CameraService } from "../service/camera.service";
import { CampusService } from "../service/campus.service";
import { RoomDetailPage } from "../pages/management/room-detail.component";
import { LocalUserService } from "../service/local-user.service";
import { SocketService } from "../service/socket.service";
import { HomeNicknameChangePage } from "../pages/home/home-nickname-change.component";
import { LoginPage } from "../pages/login/login";
import { SignupLoginService } from "../service/signup-login.service";
import { SignupPage } from "../pages/signup/signup";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                LivePage,
                ManagementTabPage,
                HomeTabPage,
                HomeNicknameChangePage,
                TabsPage,
                CameraDetailPage,
                RoomDetailPage,
                LoginPage,
                SignupPage
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                HttpModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                LivePage,
                ManagementTabPage,
                HomeTabPage,
                HomeNicknameChangePage,
                TabsPage,
                CameraDetailPage,
                RoomDetailPage,
                LoginPage,
                SignupPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                RoomService,
                CameraService,
                CampusService,
                LocalUserService,
                SocketService,
                SignupLoginService
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map