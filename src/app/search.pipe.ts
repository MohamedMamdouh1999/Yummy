import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(meals:any[], term:string):any[]{
    return meals.filter(meal => meal['strMeal'].toLowerCase().includes(term.toLowerCase()));
  }

}
