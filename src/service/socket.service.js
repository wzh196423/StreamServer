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
 * Created by kadoufall on 2017/5/28.
 */
import { Injectable } from '@angular/core';
import { LocalUserService } from './local-user.service';
var SocketService = /** @class */ (function () {
    function SocketService(localUserService) {
        this.localUserService = localUserService;
    }
    SocketService.prototype.setSocketNull = function () {
        this.socket = null;
    };
    SocketService.prototype.getSocket = function () {
        return this.socket;
    };
    SocketService.prototype.socketConnect = function () {
        this.socket = io('http://120.25.238.161:3000', { 'force new connection': true });
        this.socket.on('connect', function () {
            console.log('client_connects_success');
        });
        this.socket.on('connect_error', function () {
            console.log('connect_error');
        });
        /*
        this.socket.on('logout', () => {
          this.getSocket().disconnect();
          this.setSocketNull();
          this.navCtrl.setRoot(StartPage);
        });*/
        // 确保socket成功建立再返回
        return this.emitPromise('confirmConnect', '').then(function (data) {
            console.log(data);
            if (data === 'success') {
                return Promise.resolve('success');
            }
            else {
                return Promise.resolve('error');
            }
        }).catch(function (error) {
            console.log('SocketService-socketConnect:', error);
        });
    };
    SocketService.prototype.emitPromise = function (command, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(command, data, function (response) {
                if (typeof response === 'object') {
                    if (response.success === true) {
                        resolve(response.data);
                    }
                    else {
                        if (typeof response.data === "string") {
                            reject(response.data);
                        }
                        else {
                            reject("The request was not successful.");
                        }
                    }
                }
                else {
                    reject('The response to your request could not be parsed.');
                }
            });
        });
    };
    SocketService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LocalUserService])
    ], SocketService);
    return SocketService;
}());
export { SocketService };
//# sourceMappingURL=socket.service.js.map