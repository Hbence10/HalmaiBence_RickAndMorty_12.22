import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../.models/character.model';

@Component({
  selector: 'app-main-page',
  standalone: false,

  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  favCharacters : Character[] = []

  constructor(public http : HttpClient){
    this.apiCall().subscribe(response => this.setCharacters(response))

  }

  ngOnInit(): void {
  }

  apiCall() : Observable<any>{
    return this.http.get<any>("https://rickandmortyapi.com/api/character/1,2,244")
  }

  setCharacters(response : any[]){
    response.forEach(characterObject => {
      this.favCharacters.push(new Character(characterObject.id, characterObject.name, characterObject.status, characterObject.species, characterObject.type, characterObject.gender, characterObject.origin.name, characterObject.location.name, characterObject.image, characterObject.episode))
    });
  }
}
