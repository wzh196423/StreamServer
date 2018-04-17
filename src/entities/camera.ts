import {Campus} from "./campus";
import {Room} from "./room";
/**
 * Created by wangziheng on 2018/3/23.
 */
export class Camera{
  constructor(public model : string,
              public brand : string,
              public serialNumber : string,
              public ip : string,
              public registerTime : Date,
              public status : boolean,
              public roomId : number,
              public directStreamId ? : number,
              public id ? : number
              ){
  }
}
