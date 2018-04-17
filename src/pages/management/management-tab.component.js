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
import { NavController, App } from 'ionic-angular';
import { CameraDetailPage } from "./camera-detail.component";
import { RoomDetailPage } from "./room-detail.component";
var ManagementTabPage = /** @class */ (function () {
    function ManagementTabPage(navCtrl, appCtrl) {
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        //this.things = new string[0];
        this.things = [];
        this.things.push('摄像头管理');
        this.things.push('校区管理');
        this.things.push('教室管理');
    }
    ManagementTabPage.prototype.showDetail = function (thing) {
        if (thing === '摄像头管理') {
            this.appCtrl.getRootNav().push(CameraDetailPage);
        }
        else if (thing === '教室管理') {
            this.appCtrl.getRootNav().push(RoomDetailPage);
        }
    };
    ManagementTabPage = __decorate([
        Component({
            selector: 'page-management',
            templateUrl: 'management-tab.component.html'
        }),
        __metadata("design:paramtypes", [NavController,
            App])
    ], ManagementTabPage);
    return ManagementTabPage;
}());
export { ManagementTabPage };
//# sourceMappingURL=management-tab.component.js.map