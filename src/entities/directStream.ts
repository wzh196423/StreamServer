
export class DirectStream{
  constructor(
    public url :string,
    public status : boolean,
    public liveServerId : number,
    public liveRoomId ? : number,
    public id ? : number
  ){}
}
