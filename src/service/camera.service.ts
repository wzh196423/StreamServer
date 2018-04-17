/**
 * Created by wangziheng on 2018/3/23.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Camera} from "../entities/camera";

@Injectable()
export class CameraService{
  cameraList : Camera[];
  observers: any[];

  constructor(public http: Http) {
    this.observers = [];
    let c = new Camera('vr','360','111-222-333',"127.0.0.1",new Date(),false,1,undefined,1);
    let d = new Camera('ar','360','111-333-555',"127.0.0.2",new Date(),false,2,undefined,2);
    this.cameraList = [];
    this.cameraList.push(c);
    this.cameraList.push(d);
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
        this.cameraList = JSON.parse(res.json().friends);
        return this.cameraList;
      } else {
        // 服务器错误
        console.log('CampusService-updateCameraList:', res.json().data);
        return [];
      }
    }).catch(error => {
      return this.cameraList;
      // TODO
      // console.log(error);
      // return [];
    });
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getCameraList() {
    return this.cameraList;
  }

  addCamera(camera : Camera) {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // let url = 'http://localhost:3000/camera/addCamera';
    // let c = {
    //   brand:camera.brand,
    //   model:camera.model,
    //   serialNumber: camera.serialNumber,
    //   ip: camera.ip,
    //   registerTime:camera.registerTime,
    //   status:camera.status,
    //   roomId: camera.roomId,
    //   //streamUrl: camera.streamUrl,
    // };
    //
    // return this.http.post(url, JSON.stringify(c), options)
    //   .toPromise()
    //   .then((res) => {
    //     if (res.json().data === 'success') {
    //       this.cameraList.push(camera);
    //       this.update();
    //       return Promise.resolve('success');
    //     } else {
    //       return Promise.resolve('error');
    //     }
    //   }).catch((error) => {
    //     console.log('CameraService-addCamera', error);
    //   });
    this.cameraList.push(camera);
    this.update();
    return Promise.resolve('success');
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

  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }
}
