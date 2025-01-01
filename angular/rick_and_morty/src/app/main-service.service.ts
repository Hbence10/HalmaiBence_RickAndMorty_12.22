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
  buttonNumbers : number[] = []
  lastPage : number;

  constructor(public http : HttpClient) {}

  apiCall() : Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/?page=${this.actualPage}&name=${this.searchInputValue}&status=${this.statusSelectValue}&gender=${this.genderSelectValue}`)
  }

  setCharacter(response : any, newPage : number = 1){
    this.pageList = [];
    this.showList = [];

    (response.results as Array<any>).forEach(characterObject => {
      this.pageList.push(new Character(characterObject.id, characterObject.name, characterObject.status, characterObject.species, characterObject.type, characterObject.gender, characterObject.origin.name, characterObject.location.name, characterObject.image, characterObject.episode))
      this.showList.push(false)
    });

    this.lastPage = response.info.pages
    this.setButtonNumbers(response.info.pages, newPage)
    this.setRows();
  }

  setRows(){
    this.rows = []

    for (let i : number = 0; i < this.pageList.length; i+= 3){
      this.rows.push(this.pageList.slice(i, i+3))
    }
  }

  setButtonNumbers(pageCount : number, newPage : number){
    if (newPage == 1){
      this.buttonNumbers = []
      for(let i : number = 2; i <= pageCount; i++){
        if (this.buttonNumbers.length == 10){
          break
        }
        this.buttonNumbers.push(i)
      }

    } else if (newPage == this.lastPage){
      this.buttonNumbers = []
      for(let i : number = pageCount-1; i >= 0; i--){
        if (this.buttonNumbers.length == 10){
          break
        }
        this.buttonNumbers.push(i)
      }
      this.buttonNumbers.reverse()

    } else if (newPage > this.actualPage && newPage >= 3){                                          //elore megy a listaban
      this.buttonNumbers = []
      if (newPage + 10 <= pageCount-1){
        for(let i : number = newPage - 1; i < this.lastPage; i++){
          if (this.buttonNumbers.length == 10){
            break
          }
          this.buttonNumbers.push(i)
        }
      } else{
        for(let i : number = 2; i < this.lastPage; i++){
          this.buttonNumbers.push(i)
        }
      }


    } else if (newPage < this.actualPage && newPage <= this.lastPage - 2){                          //hatra megy a listaban
      this.buttonNumbers = []
      if (newPage - 10 >= 2){
        for(let i : number = newPage + 1; i >= 0; i--){
          if (this.buttonNumbers.length == 10){
            break
          }
          this.buttonNumbers.push(i)
        }
      }else{
        for(let i : number = 2; i <= pageCount; i++){
          this.buttonNumbers.push(i)
        }
        this.buttonNumbers.reverse()
      }

      this.buttonNumbers.reverse()

    } else if (newPage == this.actualPage){
      this.buttonNumbers = []
      for(let i : number = newPage-1; i < pageCount; i++){
        if (this.buttonNumbers.length == 10){
          break
        }
        this.buttonNumbers.push(i)
      }
    }


    this.actualPage = newPage
  }
}
