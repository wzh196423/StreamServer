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
import { Campus } from "../entities/campus";
var CampusService = /** @class */ (function () {
    function CampusService(http) {
        this.http = http;
        this.campusList = [];
        this.campusList.push(new Campus("H", "邯郸校区"));
        this.campusList.push(new Campus("Z", "张江校区"));
        this.campusList.push(new Campus("F", "枫林校区"));
        this.campusList.push(new Campus("J", "江湾校区"));
        this.observers = [];
    }
    CampusService.prototype.updateAfterLogin = function () {
        var _this = this;
        this.observers = [];
        this.campusList = [];
        return this.updateCampusList().then(function (campuses) {
            _this.campusList = campuses;
            console.log('update CampusService success, ', _this.campusList.length);
        });
    };
    // 重新从服务器获取好友列表
    CampusService.prototype.updateCampusList = function () {
        var _this = this;
        var url = 'http://localhost:3000/campus/getCampuses';
        return this.http.get(url).toPromise().then(function (res) {
            if (res.json().data === 'success') {
                _this.campusList = JSON.parse(res.json().friends);
                return _this.campusList;
            }
            else {
                return _this.campusList;
                // 服务器错误
                // console.log('CampusService-updateCampusList:', res.json().data);
                // return [];
            }
        }).catch(function (error) {
            console.log(error);
            return [];
        });
    };
    CampusService.prototype.update = function () {
        this.observers.forEach(function (item) { return item.update(); });
    };
    CampusService.prototype.getCampusList = function () {
        return this.campusList;
    };
    CampusService.prototype.addCampus = function (campus) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var url = 'http://localhost:3000/campus/addCampus';
        var c = {
            id: campus.id,
            name: campus.name,
        };
        return this.http.post(url, JSON.stringify(c), options)
            .toPromise()
            .then(function (res) {
            if (res.json().data === 'success') {
                _this.campusList.push(campus);
                _this.update();
                return Promise.resolve('success');
            }
            else {
                return Promise.resolve('error');
            }
        }).catch(function (error) {
            console.log('CampusService-addCampus', error);
        });
    };
    CampusService.prototype.registerPage = function (page) {
        this.observers.push(page);
        //component.log('register!');
    };
    CampusService.prototype.removePage = function (page) {
        this.observers.splice(this.observers.indexOf(page), 1);
        //component.log('remove!');
    };
    CampusService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], CampusService);
    return CampusService;
}());
export { CampusService };
//# sourceMappingURL=campus.service.js.map