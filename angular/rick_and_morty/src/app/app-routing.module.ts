import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { SeasonListComponent } from './season-list/season-list.component';

const routes: Routes = [
  {path: "", component: MainPageComponent, data: {animation: "homePage"}},
  {path: "home", component: MainPageComponent, data:{animation: "homePage"}},
  {path: "characterList", component: CharacterListComponent, data: {animation: "characterList"}},
  {path: "seasonList", component: SeasonListComponent, data: {animation: "seasonList"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
