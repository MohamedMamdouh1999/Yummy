import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Details } from '../interfaces/details';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listMeals:Details[] = []
  meal:string = ""
  constructor(private _DataService:DataService, private _NgxSpinnerService:NgxSpinnerService){}
  ngOnInit(): void {
    this._NgxSpinnerService.show().then(_ => {
      this._DataService.searchMeals(this.meal).subscribe({
        next: data => this.listMeals = data.meals
      })
    }).then(() => {
      setTimeout(() => {
        this._NgxSpinnerService.hide();
      }, 1500);
    })
  }
}
