import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private readonly TOKEN_KEY = 'auth_token';
  constructor(private service:ServiceService,private router:Router) { }
  
  onSubmit(data:any){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //console.warn(data)
    if ((data.address.match(validRegex)) &&(data.password.length>7)){
  
  
      //console.warn(data);
    this.service.signUp(data).subscribe(d=>{console.log(d);
      const token = 'example_token';
     localStorage.setItem(this.TOKEN_KEY, token);
     this.service.updateUserData(d);
    this.router.navigateByUrl("Main");
    }
    ,
    error => {
      //console.log("Error");
      alert("This user is already exist");

    })
    
  
      return true;
  
    } else {
  
      alert("Invalid email address!");
  
      
  
      return false;
  
    }
  
  }
  route(){
    this.router.navigateByUrl("SignIn");
  }
  ngOnInit(): void {
  }

}
