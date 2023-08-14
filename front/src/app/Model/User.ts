export class User{
    private name:string;
    private address:string;
    private password:string;
    private listChat:any[];
    constructor(add:string,pass:string){
        this.address=add;
        this.password=pass;
        this.name="";
        this.listChat=[];
    }
    getListChat(){
        return this.listChat;
    }
}