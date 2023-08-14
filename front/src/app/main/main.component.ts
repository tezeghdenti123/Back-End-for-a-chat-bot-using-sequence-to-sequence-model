import { Router } from '@angular/router';
import { User } from './../Model/User';
import { ServiceService } from '../Service/service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chat } from '../Model/Chat';
import { Message } from '../Model/Message';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dataArray:any;
  message:any;
  chat:Chat;
  link="http://localhost:8080/identifier";
  constructor(private srevice:ServiceService ,private router:Router) {
    this.chat=new Chat("",[])
   }
  ngOnInit(): void {
    
    const storedData = localStorage.getItem('mydata');
    console.log("****************************")
    console.log(storedData)
    
    console.log("****************************")
    if(storedData!= null){
      this.dataArray = JSON.parse(storedData);
    }
    else{
      this.srevice.getData().subscribe(data=>{
        console.warn(data);
        
        this.dataArray=data;
        localStorage.setItem('mydata', JSON.stringify(data));
      })
    }
    console.warn(this.dataArray);
      
  }
  newChat(){
    if(this.chat.getTimestamp()==""){
      //new chat
      console.log("new")
      if(this.chat.getListMessage().length!=0){
        //the chat is not empty
        this.chat.setTag("first chat")
        this.dataArray.listChat.push(this.chat)
        console.log(this.dataArray)
        this.srevice.insertChat(this.dataArray).subscribe(
          res => {
            console.log('Post request successful');
            console.log('Response:', res);
            this.dataArray=res;
            localStorage.removeItem('mydata');
            localStorage.setItem('mydata', JSON.stringify(this.dataArray));
            console.log(this.dataArray);
            this.chat=new Chat("",[])
          },
          err => {
            console.log('Post request failed');
            console.error(err);
          }
        );
      }
    }
    else{
      //previous chat
      console.log("not new ")
      for(var i in this.dataArray.listChat){
        console.log(i)
        if(this.chat.getTimestamp()==this.dataArray.listChat[i].timestamp){
          this.dataArray.listChat.splice(i,1);
          console.log("done**************************")
          this.dataArray.listChat.push(this.chat);
        }
        
      }
      this.srevice.insertChat(this.dataArray).subscribe(
        res => {
          console.log('Post request successful');
          console.log('Response:', res);
          this.dataArray=res;
          localStorage.removeItem('mydata');
          localStorage.setItem('mydata', JSON.stringify(this.dataArray));
          console.log(this.dataArray);
          this.chat=new Chat("",[])
        },
        err => {
          console.log('Post request failed');
          console.error(err);
        }
      );

    }
    /*console.log("hello");
    var test=0;
    console.log(this.chat)
    console.log(this.dataArray)
    console.log("this.dataArray***************")
    for(var i in this.dataArray.listChat){
      if(this.chat.getTimestamp()==this.dataArray.listChat[i].timestamp){
        this.dataArray.listChat.splice(i,1);
        console.log("done**************************")
        this.dataArray.listChat.push(this.chat);
        test=1;
      }
    }
    if(test==0){
      
      this.dataArray.listChat.push(this.chat);
    }
    console.log("this.chat.getTimestamp()*********************************************************");
    console.log(this.chat.getTimestamp());
    console.log("this.chat.getTimestamp()*********************************************************");
    //localStorage.removeItem('mydata');
    //localStorage.setItem('mydata', JSON.stringify(this.dataArray));
    //console.log(this.dataArray);
    this.srevice.insertChat(this.dataArray).subscribe(
      res => {
        console.log('Post request successful');
        console.log('Response:', res);
        this.dataArray=res;
        localStorage.removeItem('mydata');
        localStorage.setItem('mydata', JSON.stringify(this.dataArray));
        console.log(this.dataArray);
        this.chat=new Chat("new",[])
      },
      err => {
        console.log('Post request failed');
        console.error(err);
      }
    );*/
    
  }
  getChat(nb:any){
    /*for(var i in this.dataArray.listChat){
      console.log(this.dataArray.listChat[i].timestamp)
      if(this.chat.getTimestamp()==this.dataArray.listChat[i].timestamp){
        this.dataArray.listChat.splice(i,1);
        console.log("done**************************")
        this.dataArray.listChat.push(this.chat);
        this.chat.
        //test=1;
      }
    }*/
    this.chat.setTag(nb.tag)
    this.chat.setTimestamp(nb.timestamp)
    this.chat.setListMessage(nb.listMessage)
  }
  logout(){
    console.log("hello")
    var test=0;
    /*for(var i in this.dataArray.listChat){
      if(this.chat.getTimestamp()==this.dataArray.listChat[i].timestamp){
        this.dataArray.listChat.splice(i,1);
        console.log("done**************************")
        this.dataArray.listChat.push(this.chat);
        test=1;
      }
    }
    if(test==0){
      this.dataArray.listChat.push(this.chat);
    }
    console.log(this.chat.getTimestamp());
    
    console.log(this.dataArray);
    this.srevice.insertChat(this.dataArray).subscribe(d=>{
      console.log('Insert request success') 
      console.log(d)
    });*/
    this.srevice.logout();
    localStorage.removeItem('mydata');
    this.router.navigateByUrl("SignIn")
  }
  delete(){
    localStorage.removeItem('mydata');
    this.srevice.deleteChat(this.dataArray.address).subscribe(
      res => {
        console.log('DELETE request successful');
        console.log('Response:', res);
      },
      err => {
        console.log('DELETE request failed');
        console.error(err);
      }
    );
    location.reload();
    console.log("this from delete")
    console.log(this.dataArray.address)
  }
  send(data:any){
    this.message=new Message("User",data.input)
    this.chat.addMessage(this.message)
    console.log("afetr send")
    //handle the response******************************/
    this.message=new Message("chatbot","I'm the bot")
    this.chat.addMessage(this.message)
    console.log(this.chat)
  }
  show(){
    console.warn(this.dataArray);
  }
}
