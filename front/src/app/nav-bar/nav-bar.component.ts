import { Router } from '@angular/router';
import { ServiceService } from './../Service/service.service';
import { Component, OnInit } from '@angular/core';
import { Chat } from '../Model/Chat';
import { Message } from '../Model/Message';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  dataArray:any;
  message:any;
  chat:Chat;
  response:any;
  constructor(private service:ServiceService,private router:Router) { this.chat=new Chat("",[])}

  ngOnInit(): void {
    const storedData = localStorage.getItem('mydata');
    console.log("****************************")
    console.log(storedData)
    
    console.log("****************************")
    if(storedData!= null){
      this.dataArray = JSON.parse(storedData);
    }
    else{
      this.service.getData().subscribe(data=>{
        console.warn(data);
        
        this.dataArray=data;
        localStorage.setItem('mydata', JSON.stringify(data));
      })
    }
    console.warn(this.dataArray);
  }
  new(){
    
    var test=0;
    for(var i=0; i<this.dataArray.listChat.length;i++){
      //console.log(this.dataArray.listChat[i].timestamp)
      if(this.chat.getTag()==this.dataArray.listChat[i].tag){
        console.log(this.dataArray.listChat[i].tag)
        this.dataArray.listChat.splice(i,1);
        this.dataArray.listChat.push(this.chat);
        test=1
      }
    }
    if((test==0)&&(this.chat.getListMessage().length!=0)){
      this.chat.setTag("Cancer")
      this.dataArray.listChat.push(this.chat);
    }
    this.service.insertChat(this.dataArray).subscribe( res=>{
      console.log('Insert request success') 
      console.log(res)
      
    },
    err => {
      console.log('Insert request failed');
      console.error(err);
      
      
    })
    localStorage.removeItem('mydata');
    localStorage.setItem('mydata', JSON.stringify(this.dataArray));
    this.chat=new Chat("",[])
    console.log("new")
  }
  send(data:any){
    //console.log(data.input)
    this.message=new Message("User",data.input)
    this.chat.addMessage(this.message)
    //console.log("afetr send")
    //handle the response******************************/
    this.service.ask(data.input).subscribe(
      res=>{
        console.log(res);
        this.response=res
        this.message=new Message("",this.response)
        this.chat.addMessage(this.message)
      }
    )
    //end
    
    
    //console.log(this.chat)
  }
  getChat(nb:any){
    var test=0;
    for(var i=0; i<this.dataArray.listChat.length;i++){
      //console.log(this.dataArray.listChat[i].timestamp)
      if(this.chat.getTag()==this.dataArray.listChat[i].tag){
        console.log(this.dataArray.listChat[i].tag)
        this.dataArray.listChat.splice(i,1);
        this.dataArray.listChat.push(this.chat);
        test=1
      }
    }
    if((test==0)&&(this.chat.getListMessage().length!=0)){
      this.chat.setTag("Cancer")
      
      this.dataArray.listChat.push(this.chat);
    }
    localStorage.removeItem('mydata');
    localStorage.setItem('mydata', JSON.stringify(this.dataArray));
    this.service.insertChat(this.dataArray).subscribe( res=>{
      console.log('Insert request success') 
      console.log(res)
      
    },
    err => {
      console.log('Insert request failed');
      console.error(err);
      
      
    })
    this.chat=new Chat("",[])
    this.chat.setTag(nb.tag)
    this.chat.setTimestamp(nb.timestamp)
    this.chat.setListMessage(nb.listMessage)
    //console.log(this.chat)

  }
  logout(){
    console.log("hello")
    var test=0;
    
    for(var i=0; i<this.dataArray.listChat.length;i++){
      //console.log(this.dataArray.listChat[i].timestamp)
      if(this.chat.getTag()==this.dataArray.listChat[i].tag){
        console.log(this.dataArray.listChat[i].tag)
        this.dataArray.listChat.splice(i,1);
        this.dataArray.listChat.push(this.chat);
        test=1
        
      }
    }
    if((test==0)&&(this.chat.getListMessage().length!=0)){
      this.chat.setTag("Cancer")
      this.dataArray.listChat.push(this.chat);
    }
    this.service.insertChat(this.dataArray).subscribe( res=>{
      console.log('Insert request success') 
      console.log(res)
      this.service.logout();
      localStorage.removeItem('mydata');
      this.router.navigateByUrl("SignIn")
    },
    err => {
      console.log('Insert request failed');
      console.error(err);
      this.service.logout();
      localStorage.removeItem('mydata');
      this.router.navigateByUrl("SignIn")
      
    })
    
  }
  
}
