export class LiveServer{
  constructor(
    public port : string,
    public maxStream : number,
    public serverId : number,
    public rootServerId : number,
    public id ? : number
  ){}
}
