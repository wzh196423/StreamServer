/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Camera} from "../entities/camera";
import {DirectStream} from "../entities/directStream";

@Injectable()
export class CameraService{
  cameraList : Camera[];
  observers: any[];

  constructor(public http: Http) {
    this.observers = [];
    // let c = new Camera('vr','360','111-222-333',"127.0.0.1",new Date(),false,1,undefined,1);
    // let d = new Camera('ar','360','111-333-555',"127.0.0.2",new Date(),false,2,undefined,2);
    this.cameraList = [];
    // this.cameraList.push(c);
    // this.cameraList.push(d);
  }

  updateAfterLogin() {
    this.observers = [];
    this.cameraList = [];

    return this.updateCameraList().then(cameras => {
      this.cameraList = cameras;
      console.log('update CameraService success, ', this.cameraList.length);
    });
  }

  // 重新从服务器获取摄像头列表
  updateCameraList() {
    let url = 'http://localhost:3000/camera/getCameras';
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.cameraList = JSON.parse(res.json().cameras);
        return this.cameraList;
      } else {
        // 服务器错误
        console.log('CampusService-updateCameraList:', res.json().data);
        return [];
      }
    }).catch(error => {
      console.log(error);
      return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getCameraList() {
    return this.cameraList;
  }

  addCamera(camera : Camera) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/camera/addCamera';
    let c = {
      brand:camera.brand,
      model:camera.model,
      serialNumber: camera.serialNumber,
      ip: camera.ip,
      registerTime:camera.registerTime,
      status:camera.status,
      roomId: camera.roomId,
    };

    return this.http.post(url, JSON.stringify(c), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          camera.id = res.json().id;
          console.log(camera);
          this.cameraList.push(camera);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('CameraService-addCamera', error);
        return Promise.resolve('error');
      });
  }

  // modifyUrl(camera:Camera,newUrl) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers});
  //   let url = 'http://120.25.238.161:3000/camera/modifyUrl';
  //   let info = {
  //     serialNumber: camera.serialNumber,
  //     newUrl: newUrl,
  //   };
  //
  //   return this.http.put(url, JSON.stringify(info), options)
  //     .toPromise()
  //     .then(res => {
  //       if (res.json().data === 'success') {
  //         camera.streamUrl = newUrl;
  //         return Promise.resolve('success');
  //       }
  //       return Promise.resolve('error');
  //     }).catch((error) => {
  //       console.log('CameraService-modifyUrl', error);
  //       return Promise.resolve('error');
  //     });
  // }

  modifyStatus(camera:Camera,status:boolean){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/camera/switchCamera';
    let c = {
      cameraId: camera.id,
      status: status,
      //streamUrl: camera.streamUrl,
    };
    return this.http.put(url, JSON.stringify(c), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          camera.status = status;
          console.log(camera);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('CameraService-modifyStatus', error);
        return Promise.resolve('error');
      });
  }

  deleteCamera(camera:Camera){
    let url = 'http://localhost:3000/camera/deleteCamera?id='+camera.id;
    return this.http.delete(url)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          this.cameraList.splice(this.cameraList.indexOf(camera),1);
          console.log(camera);
          this.update();
          return Promise.resolve('success');
        } else if (res.json().data == 'ForeignKeyConstraintError'){
          return Promise.resolve('constraintError');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('CameraService-deleteCamera', error);
        return Promise.resolve('error');
      });
  }

  bindDirectStream(camera: Camera , directStreamId: number){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/camera/bindDirectStream';
    let c = {
      cameraId: camera.id,
      directStreamId: directStreamId,
    };
    return this.http.put(url,JSON.stringify(c),options)
      .toPromise()
      .then(res => {
        if (res.json().data === 'success') {
          camera.directStreamId = directStreamId;
          console.log(camera);
          this.update();
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch(error => {
        console.log('CameraService-bindDirectStream', error);
        return Promise.resolve('error');
      })
  }

  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }
}
