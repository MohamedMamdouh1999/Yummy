import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from '../interfaces/categories';
import { Details } from '../interfaces/details';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit {
  constructor(private _DataService:DataService, private _ActivatedRoute:ActivatedRoute, private _Router:Router, private _NgxSpinnerService:NgxSpinnerService){}

  strTitle:any

  main:any[]=[]
  mainMeals:Details[]=[]
  categories:Categories[]=[]

  type:string|null = ""
  typeName:string|null = ""

  ngOnInit(): void {
    this._NgxSpinnerService.show().then(_ => {
      this._ActivatedRoute.paramMap.subscribe(params => {
        this.type = params.get("type")
        this.typeName = params.get("typeName")

        if(this.type === "a"){
          this.strTitle = "strArea"
          if(this.typeName === null){
            this._DataService.getDifferentContent("list", this.type, "list").subscribe({
              next: data => {
                this.categories.length = 0
                this.main =  data.meals
              }
            })
          } else{
            this._DataService.getDifferentContent("filter", this.type, this.typeName).subscribe({
              next: data => {
                this.mainMeals = data.meals
              }
            })
          }
        } else if(this.type === "c"){
          this.strTitle = "strCategory"
          if(this.typeName === null){
            this._DataService.getCategories().subscribe({
              next: data => {
                this.main.length = 0
                this.categories =  data.categories
              }
            })
          } else{
            this._DataService.getDifferentContent("filter", this.type, this.typeName).subscribe({
              next: data => {
                this.mainMeals = data.meals
              }
            })
          }
        } else if(this.type === "i"){
          this.strTitle = "strIngredient"
          if(this.typeName === null){
            this._DataService.getDifferentContent("list", this.type, "list").subscribe({
              next: data => {
                this.categories.length = 0
                this.main =  data.meals
              }
            })
          } else{
            this._DataService.getDifferentContent("filter", this.type, this.typeName).subscribe({
              next: data => {
                if(data.meals !== null){
                  this.mainMeals = data.meals
                } else {
                  this._Router.navigate(['/NotFoundPage'])
                }
              }
            })
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
