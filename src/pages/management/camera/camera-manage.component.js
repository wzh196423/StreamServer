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
import { App, NavController, LoadingController, AlertController, ToastController } from "ionic-angular";
import { RoomService } from "../../../service/room.service";
import { CampusService } from "../../../service/campus.service";
import { CameraService } from "../../../service/camera.service";
import { Camera } from "../../../entities/camera";
/**
 * Created by wangziheng on 2018/3/24.
 */
var CameraDetailPage = /** @class */ (function () {
    function CameraDetailPage(appCtrl, navCtrl, roomService, campusService, cameraService, loadingCtrl, alertCtrl, toastCtrl) {
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.roomService = roomService;
        this.campusService = campusService;
        this.cameraService = cameraService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.roomList = roomService.getRoomList();
        this.roomListByCampus = this.roomList;
        this.campusList = campusService.getCampusList();
        this.cameraList = cameraService.getCameraList();
        this.serialNumber = '';
        this.ip = '';
    }
    CameraDetailPage_1 = CameraDetailPage;
    CameraDetailPage.prototype.getRoomIdByCampusId = function (campusId) {
        var result = [];
        for (var _i = 0, _a = this.roomList; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.campusId === campusId) {
                result.push(r);
            }
        }
        return result;
    };
    CameraDetailPage.prototype.updateRoomByCampus = function () {
        this.roomListByCampus = this.getRoomIdByCampusId(this.campusId);
    };
    CameraDetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.roomService.updateRoomList().then(function (rooms) {
            _this.roomList = rooms;
            _this.roomListByCampus = _this.roomList;
        });
        this.cameraService.updateCameraList().then(function (cameras) {
            _this.cameraList = cameras;
        });
        this.campusService.updateCampusList().then(function (campuses) {
            _this.campusList = campuses;
        });
        this.cameraService.registerPage(this);
        this.roomService.registerPage(this);
        this.campusService.registerPage(this);
    };
    CameraDetailPage.prototype.ionViewDidLeave = function () {
        this.cameraService.removePage(this);
        this.roomService.removePage(this);
        this.campusService.removePage(this);
    };
    CameraDetailPage.prototype.update = function () {
        var _this = this;
        this.cameraService.updateCameraList().then(function (cameras) {
            _this.cameraList = cameras;
        });
    };
    CameraDetailPage.prototype.onSubmit = function () {
        var _this = this;
        if (this.serialNumber === '') {
            var alert_1 = this.alertCtrl.create({
                title: '注册摄像头失败',
                subTitle: '序列号不能为空，请重新输入',
                buttons: ['确定']
            });
            alert_1.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: "注册中，请稍等",
                duration: 2000
            });
            loading_1.present();
            var toast = null;
            var temp = new Camera(this.serialNumber, this.ip, this.campusId, this.roomId);
            this.cameraService.addCamera(temp).then(function (data) {
                if (data !== 'success') {
                    toast = _this.toastCtrl.create({
                        message: "摄像头注册成功,serialNum :" + _this.serialNumber + ",ip :" + _this.ip + ", campus :" + _this.campusId + ", location :" + _this.roomId,
                        duration: 2000,
                        position: 'middle',
                    });
                    toast.onDidDismiss(function () {
                        _this.navCtrl.setRoot(CameraDetailPage_1);
                    });
                    loading_1.dismiss();
                    toast.present();
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: '注册失败',
                        subTitle: '摄像头已被注册或服务器错误，请重试',
                        buttons: ['确定']
                    });
                    loading_1.dismiss();
                    alert_2.present();
                }
            });
        }
    };
    CameraDetailPage = CameraDetailPage_1 = __decorate([
        Component({
            selector: 'page-camera-detail',
            templateUrl: 'camera/camera-manage.component.html',
        }),
        __metadata("design:paramtypes", [App,
            NavController,
            RoomService,
            CampusService,
            CameraService,
            LoadingController,
            AlertController,
            ToastController])
    ], CameraDetailPage);
    return CameraDetailPage;
    var CameraDetailPage_1;
}());
export { CameraDetailPage };
//# sourceMappingURL=camera-manage.component.js.map
