import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem("userToken")){
      this.saveUserData()
    }
  }

  userData:any = new BehaviorSubject(null)

  saveUserData():void{
    let endecode:string = JSON.stringify(localStorage.getItem("userToken"))
    let decode:object = jwtDecode(endecode)
    this.userData.next(decode)
  }

  signUp(userInfo:object):Observable<any>{
    return this._HttpClient.post('https://route-movies-api.vercel.app/signup', userInfo)
  }
  signIn(userData:object):Observable<any>{
    return this._HttpClient.post("https://route-movies-api.vercel.app/signin", userData)
  }
}
