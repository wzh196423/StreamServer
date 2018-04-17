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
 * Created by wangziheng on 2018/3/23.
 */
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var CameraService = /** @class */ (function () {
    function CameraService(http) {
        this.http = http;
        this.observers = [];
    }
    CameraService.prototype.updateAfterLogin = function () {
        var _this = this;
        this.observers = [];
        this.cameraList = [];
        return this.updateCameraList().then(function (cameras) {
            _this.cameraList = cameras;
            console.log('update CameraService success, ', _this.cameraList.length);
        });
    };
    // 重新从服务器获取好友列表
    CameraService.prototype.updateCameraList = function () {
        var _this = this;
        var url = 'http://localhost:3000/camera/getCameras';
        return this.http.get(url).toPromise().then(function (res) {
            if (res.json().data === 'success') {
                _this.cameraList = JSON.parse(res.json().friends);
                return _this.cameraList;
            }
            else {
                // 服务器错误
                console.log('CampusService-updateCameraList:', res.json().data);
                return [];
            }
        }).catch(function (error) {
            console.log(error);
            return [];
        });
    };
    CameraService.prototype.update = function () {
        this.observers.forEach(function (item) { return item.update(); });
    };
    CameraService.prototype.getCameraList = function () {
        return this.cameraList;
    };
    CameraService.prototype.addCamera = function (camera) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var url = 'http://localhost:3000/camera/addCamera';
        var c = {
            serialNumber: camera.serialNumber,
            ip: camera.ip,
            campus: camera.campusId,
            room: camera.roomId,
        };
        return this.http.post(url, JSON.stringify(c), options)
            .toPromise()
            .then(function (res) {
            if (res.json().data === 'success') {
                _this.cameraList.push(camera);
                _this.update();
                return Promise.resolve('success');
            }
            else {
                return Promise.resolve('error');
            }
        }).catch(function (error) {
            console.log('CameraService-addCamera', error);
        });
    };
    CameraService.prototype.registerPage = function (page) {
        this.observers.push(page);
        //component.log('register!');
    };
    CameraService.prototype.removePage = function (page) {
        this.observers.splice(this.observers.indexOf(page), 1);
        //component.log('remove!');
    };
    CameraService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], CameraService);
    return CameraService;
}());
export { CameraService };
//# sourceMappingURL=camera.service.js.map