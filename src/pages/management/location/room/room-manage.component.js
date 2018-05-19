var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Room } from "../../../../entities/room";
import { AlertController, App, LoadingController, NavController, ToastController } from "ionic-angular";
import { RoomService } from "../../../../service/room.service";
import { CampusService } from "../../../../service/campus.service";
import { CameraService } from "../../../../service/camera.service";
var RoomDetailPage = /** @class */ (function () {
    function RoomDetailPage(appCtrl, navCtrl, roomService, campusService, cameraService, loadingCtrl, alertCtrl, toastCtrl) {
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.roomService = roomService;
        this.campusService = campusService;
        this.cameraService = cameraService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.roomList = this.roomService.getRoomList();
        this.campusList = this.campusService.getCampusList();
        this.newId = "";
        this.newCampusId = "";
        this.map = new Map();
        for (var _i = 0, _a = this.campusList; _i < _a.length; _i++) {
            var c = _a[_i];
            this.map.set(c.id, c.name);
        }
    }
    RoomDetailPage_1 = RoomDetailPage;
    RoomDetailPage.prototype.onSubmit = function () {
        var _this = this;
        if (this.newCampusId === undefined || this.newCampusId === '') {
            var alert_1 = this.alertCtrl.create({
                title: '添加教室失败',
                subTitle: '校区不能为空，请重新选择',
                buttons: ['确定']
            });
            alert_1.present();
        }
        else if (this.newId === undefined || this.newId === '') {
            var alert_2 = this.alertCtrl.create({
                title: '添加教室失败',
                subTitle: '教室名不能为空，请重新输入',
                buttons: ['确定']
            });
            alert_2.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: "注册中，请稍等",
                duration: 2000
            });
            loading_1.present();
            var toast = null;
            var temp = new Room(this.newId, this.newCampusId);
            this.roomService.addRoom(temp).then(function (data) {
                if (data === 'success') {
                    toast = _this.toastCtrl.create({
                        message: "教室添加成功,校区 :" + _this.newCampusId + ",教室名 :" + _this.newId,
                        duration: 2000,
                        position: 'middle',
                    });
                    toast.onDidDismiss(function () {
                        //this.appCtrl.getRootNav().push(RoomManagePage)
                        _this.navCtrl.setRoot(RoomDetailPage_1);
                    });
                    loading_1.dismiss();
                    toast.present();
                }
                else {
                    var alert_3 = _this.alertCtrl.create({
                        title: '添加教室失败',
                        subTitle: '教室已被注册或服务器错误，请重试',
                        buttons: ['确定']
                    });
                    loading_1.dismiss();
                    alert_3.present();
                }
            });
        }
    };
    RoomDetailPage.prototype.showDetail = function (room) {
        var alert = this.alertCtrl.create({
            title: room.campusId + room.id,
            message: "该教室位于" + this.map.get(room.campusId),
            buttons: ['确定']
        });
        alert.present();
    };
    RoomDetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.roomService.updateRoomList().then(function (rooms) {
            _this.roomList = rooms;
        });
        this.campusService.updateCampusList().then(function (campuses) {
            _this.campusList = campuses;
        });
        this.roomService.registerPage(this);
        this.campusService.registerPage(this);
    };
    RoomDetailPage.prototype.ionViewDidLeave = function () {
        this.roomService.removePage(this);
        this.campusService.removePage(this);
    };
    RoomDetailPage.prototype.update = function () {
        var _this = this;
        this.roomService.updateRoomList().then(function (rooms) {
            _this.roomList = rooms;
        });
        this.campusService.updateCampusList().then(function (campuses) {
            _this.campusList = campuses;
        });
    };
    RoomDetailPage = RoomDetailPage_1 = __decorate([
        Component({
            selector: 'page-room-detail',
            templateUrl: 'room/room-manage.component.html',
        }),
        __metadata("design:paramtypes", [App,
            NavController,
            RoomService,
            CampusService,
            CameraService,
            LoadingController,
            AlertController,
            ToastController])
    ], RoomDetailPage);
    return RoomDetailPage;
    var RoomDetailPage_1;
}());
export { RoomDetailPage };
//# sourceMappingURL=location-manage.component.js.map
