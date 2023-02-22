import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { TypesListComponent } from './types-list/types-list.component';
import { UserInfoGuard } from './user-info.guard';


const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', canActivate:[UserInfoGuard], component:HomeComponent},
  {path:'type/:type', canActivate:[UserInfoGuard], component:TypesListComponent},
  {path:'type/:type/:typeName', canActivate:[UserInfoGuard], component:TypesListComponent},
  {path:'details/:id', canActivate:[UserInfoGuard], component:MealDetailsComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
