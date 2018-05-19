import {Component} from "@angular/core";
import {LiveRoom} from "../../../entities/liveRoom";
import {DirectStream} from "../../../entities/directStream";
import {NavParams} from "ionic-angular";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-live-room-watch',
  templateUrl: 'live-room-watch.component.html'
})

export class LiveRoomWatchPage{
  liveRoom:LiveRoom;
  directStream:DirectStream;
  videoUrl:string;
  constructor(public navParam: NavParams,
              private domSanitizer: DomSanitizer){
    this.liveRoom = navParam.get('liveRoom');
    this.directStream = navParam.get('directStream');
    this.videoUrl = 'http'+this.directStream.url.split('rtmp')[1]+"/playlist.m3u8";
  }
}
