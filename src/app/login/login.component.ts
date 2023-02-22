import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _Router:Router, private _NgxSpinnerService:NgxSpinnerService){}
  ngOnInit(): void {
    this._NgxSpinnerService.show().then(_ => {
      this._AuthService.userData.subscribe({
        next: () => {
          this._AuthService.userData.getValue() !== null ? this._Router.navigate(['/home']) : false;
        }
      })
    }).then(_ => {
      setTimeout(() => {
        this._NgxSpinnerService.hide()
      }, 1500);
    })
  }
  response:string = ""
  isLoading:boolean = false

  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,15}$/)])
  })

  submitForm(loginForm:FormGroup){
    this._NgxSpinnerService.show().then(_ => {
      this.isLoading = true
      this._AuthService.signIn(loginForm.value).subscribe({
        next: data => {
          if(data.message === "success"){
            this.response = data.message
            localStorage.setItem("userToken", data.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home'])
            this.isLoading = false
          } else{
            this.response = data.message
            this.isLoading = false
          }
        }
      })
    }).then(_ => {
      setTimeout(() => {
        this._NgxSpinnerService.hide()
      }, 1500);
    })
  }
}
