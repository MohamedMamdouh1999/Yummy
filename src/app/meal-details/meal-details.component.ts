import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {
  constructor(private _DataService:DataService, private _ActivatedRoute:ActivatedRoute, private _NgxSpinnerService:NgxSpinnerService){}
  id:string|null = ""
  mealDetails:any = {}
  ngOnInit(): void {
    this._NgxSpinnerService.show().then(_ => {
      this._ActivatedRoute.paramMap.subscribe(params => {
        this.id = params.get('id')
        this._DataService.getDetails(this.id).subscribe({
          next: data =>this.mealDetails = data.meals[0]
        })
      })
    }).then(_ => {
      setTimeout(() => {
        this._NgxSpinnerService.hide()
      }, 1500);
    })
  }
}
