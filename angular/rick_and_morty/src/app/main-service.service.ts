import { Character } from './../.models/character.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  pageList : Character[] = []
  selectedCharacter : Character;
  rows : Character[][] = []
  pageButtons : number [] = []
  selectedPage : number = 1
  searchInputValue : string = "";
  statusSelectValue : string = ""
  genderSelectValue : string = ""
  showList : boolean[] = []
  actualPage : number = 1

  constructor(public http : HttpClient) {

  }

  apiCall() : Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/?page=${this.actualPage}&name=${this.searchInputValue}&status=${this.statusSelectValue}&gender=${this.genderSelectValue}`)
  }

  setCharacter(response : any){
    this.pageList = [];
    this.showList = [];

    (response.results as Array<any>).forEach(characterObject => {
      this.pageList.push(new Character(characterObject.id, characterObject.name, characterObject.status, characterObject.species, characterObject.type, characterObject.gender, characterObject.origin.name, characterObject.location.name, characterObject.image, characterObject.episode))
      this.showList.push(false)
    });

    this.setRows();
    this.setButtonNumbers(response.info.pages)
  }

  setRows(){
    this.rows = []

    for (let i : number = 0; i < this.pageList.length; i+= 3){
      this.rows.push(this.pageList.slice(i, i+3))
    }
  }

  setButtonNumbers(pageCount : number){

  }
}
