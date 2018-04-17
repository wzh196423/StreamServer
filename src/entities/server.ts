export class Server{
  constructor(
    public ip : string,
    public brand : string,
    public registerTime : Date,
    public description : string,
    public storage : number,
    public usedStorage : number,
    public cores : number,
    public memory : number,
    public roomId : number,
    public id ? : number
  ){}
}
