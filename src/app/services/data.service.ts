import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _HttpClient:HttpClient) { }

  searchMeals(meal:string):Observable<any>{
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  }

  getDifferentContent(type:string, content:string, area:string):Observable<any>{
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/${type}.php?${content}=${area}`)
  }

  getCategories():Observable<any>{
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  }

  getDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  }
}
