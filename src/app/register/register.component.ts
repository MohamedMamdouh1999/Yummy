import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _Router:Router, private _NgxSpinnerService:NgxSpinnerService){}
  ngOnInit(): void {
    this._NgxSpinnerService.show().then(_ => {
      this._AuthService.userData.subscribe({
        next: () => this._AuthService.userData.getValue() !== null ? this._Router.navigate(['/home']) : false
      })
    }).then(_ => {
      setTimeout(() => {
        this._NgxSpinnerService.hide()
      }, 1500);
    })
  }
  error:string = "";
  success:string = "";
  isLoading:boolean = false

  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    last_name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    age:new FormControl(null, [Validators.required, Validators.min(16), Validators.max(100)]),
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,15}$/)]),
  })

  submitForm(registerForm:FormGroup){
    this._NgxSpinnerService.show().then(_ => {
      this.isLoading = true
      this._AuthService.signUp(registerForm.value).subscribe({
        next: data => {
          if(data.message === "success"){
            this.error = ""
            this.success = data.message
            this._Router.navigate(['/login'])
            this.isLoading = false
          } else{
            this.error = data.errors.email.message
            this.success = ""
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
