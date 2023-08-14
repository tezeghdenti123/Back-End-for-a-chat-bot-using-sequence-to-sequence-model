export class Chat{
    timestamp:any;
    tag:string;
    listMessage:any[]
    constructor(tag:any,list:any){
        this.timestamp="";
        this.tag=tag;
        this.listMessage=list;
    }
    public setTag(tag:string){
        this.tag=tag;
    }
    public getTag(){
        return this.tag;
    }
    public getTimestamp(){
        return this.timestamp;
    }
    public setTimestamp(nb:any){
        this.timestamp=nb;
    }
    public getListMessage(){
        return this.listMessage;
    }
    public setListMessage(list:any[]){
        for(var x in list){
            this.listMessage.push(list[x]);
        }
    }
    public addMessage(message:any){
        this.listMessage.push(message);
    }
    
}