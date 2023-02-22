import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _Router:Router, private _NgxSpinnerService:NgxSpinnerService){}
  isLogin:boolean = false
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () => {
        this._AuthService.userData.getValue() ? this.isLogin = true : this.isLogin = false;
      }
    })
  }
  logout(){
    this._NgxSpinnerService.show().then(_ => {
      localStorage.removeItem("userToken")
      this._AuthService.userData.next(null)
      this._Router.navigate(['/login'])
    }).then(_ => {
      setTimeout(() => {
        this._NgxSpinnerService.hide()
      }, 1500);
    })
  }
}
