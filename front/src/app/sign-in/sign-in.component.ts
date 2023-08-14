import { User } from './../Model/User';
import { ServiceService } from '../Service/service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  res:any;
  user:any;

  private readonly TOKEN_KEY = 'auth_token';
  constructor(private service:ServiceService,private router:Router) { }
  onSubmit(data:any){
    console.warn(data);
    this.service.signIn(data).subscribe(d=>{
      this.res=d;
      console.log(this.res);
      if(this.res==true){
        const token = 'example_token';
        localStorage.setItem(this.TOKEN_KEY, token);
        this.service.getUser(data.address).subscribe(
          da=>{
            this.user=da
            console.log(this.user);
            this.service.updateUserData(this.user);
            this.router.navigateByUrl("Main");
          }
        )
        
      }
      else{
        location.reload();
        alert("Incorrect username or password.")

      }
    })

  }
  route(){
    this.router.navigateByUrl("SignUp");
  }
  ngOnInit(): void {
  }

}
