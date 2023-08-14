import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import {HttpClientModule} from '@angular/common/http';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { MainComponent } from '../main/main.component'
import { AuthGuard } from '../ProtectedRouting/auth.guard';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
