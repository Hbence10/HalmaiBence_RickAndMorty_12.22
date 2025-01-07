import { Character } from './../.models/character.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MainServiceService {
  pageList : Character[] = []                                       //
  selectedCharacter : Character;                                    //
  rows : Character[][] = []                                         //
  pageButtons : number [] = []                                      //
  selectedPage : number = 1                                         //
  searchInputValue : string = "";                                   //
  statusSelectValue : string = ""                                   //
  genderSelectValue : string = ""                                   //
  actualPage : number = 1                                           //
  buttonNumbers : number[] = []                                     //
  lastPage : number;                                                //

  constructor(public http : HttpClient) {}

  apiCall() : Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/?page=${this.actualPage}&name=${this.searchInputValue}&status=${this.statusSelectValue}&gender=${this.genderSelectValue}`)
  }

  setCharacter(response : any, newPage : number = 1){
    this.pageList = [];

    (response.results as Array<any>).forEach(characterObject => {
      this.pageList.push(new Character(characterObject.id, characterObject.name, characterObject.status, characterObject.species, characterObject.type, characterObject.gender, characterObject.origin.name, characterObject.location.name, characterObject.image, characterObject.episode))
    });

    this.lastPage = response.info.pages
    this.setRows();
  }

  setRows(){
    this.rows = []

    for (let i : number = 0; i < this.pageList.length; i+= 3){
      this.rows.push(this.pageList.slice(i, i+3))
    }
  }

  setButtonNumbers(newPage : number){
    this.buttonNumbers = []

    if (newPage == 1 || newPage == 2){                                                                            // Ha az elso oldalt nezzuk meg:
      this.forLoop(2, this.lastPage)
    } else if (newPage == this.lastPage || newPage == this.lastPage - 1){                                         // Ha az utolso oldalt nezzuk meg:
      if (this.lastPage - 10 >= 2){                                                                               // Ha kijon az adott szambol 12 gomb:
        this.forLoop(this.lastPage-10, this.lastPage)
      } else{
        this.forLoop(2, this.lastPage)
      }
    } else if (newPage > this.actualPage){                                                                        // Ha elore megyunk a listaban
      if (newPage + 10 <= this.lastPage-1){                                                                       //
        this.forLoop(newPage-1, this.lastPage)
      } else if (this.lastPage-10 >= 2) {
        this.forLoop(this.lastPage-10, this.lastPage)
      } else{
        this.forLoop(2, this.lastPage)
      }
    } else if (newPage < this.actualPage){                                                                        // Ha hatra megyunk a listaban
      console.log("kisebb")
      if (newPage - 10 >= 2){                                                                                     //
        this.forLoop(newPage - 8, newPage+2)
      } else {
        this.forLoop(2, this.lastPage)
      }
    }

    this.actualPage = newPage                                                                                     // Modositjuk az aktualis oldalnak az erteket --> ez a valtozo alapjan szedi le az API az adatokat
  }

  // Vegrehajt egy sima for loopot a kivant kezdo es vegszammak --> OKA: Nem kell igy egyesevel megirogatni a foor loopot
  forLoop(startNumber : number, endNumber : number){
    for(let i = startNumber; i < endNumber; i++){
      if (this.buttonNumbers.length == 10){
        break
      }

      this.buttonNumbers.push(i)
    }
  }
}
