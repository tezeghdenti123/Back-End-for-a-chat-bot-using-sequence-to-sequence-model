import { User } from '../Model/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly TOKEN_KEY = 'auth_token';
  private userDataSource:BehaviorSubject<any>=new BehaviorSubject([])
  constructor(private http:HttpClient) { }
  signIn( user:any){
    return this.http.post("http://localhost:8080/identifier",user);
  }
  getUser( user:any){
    return this.http.get("http://localhost:8080/user?address="+user,{});
  }
  updateUserData(data:any) {
    this.userDataSource.next(data);
  }
  signUp( user:any){
    return this.http.post("http://localhost:8080/Register",user);
  }
  getData():Observable<any[]>{
    return this.userDataSource.asObservable();
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  getToken(): any {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  deleteChat(address:any){
    return this.http.delete("http://localhost:8080/Clean?address="+address)
  }
  insertChat(user:any){
    return this.http.post("http://localhost:8080/save",user);
  }
  ask(data:any){
    return this.http.post("http://localhost:5000/your-route/"+data,{});
  }

}
