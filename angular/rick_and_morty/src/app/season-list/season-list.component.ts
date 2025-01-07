import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Episode } from '../../.models/episode.model';
import { Character } from '../../.models/character.model';

@Component({
  selector: 'app-season-list',
  standalone: false,

  templateUrl: './season-list.component.html',
  styleUrl: './season-list.component.css'
})
export class SeasonListComponent {
  seasons : number[][] = [[1,11], [12, 22], [22, 32], [32, 42], [42, 52]];
  episodeList : Episode[] = []
  characterList : Character[] = []
  showList : boolean[] = []
  posterPath : string = ""
  showDetails : boolean = false;
  selectedSeason : number = 0;

  constructor(public http : HttpClient){}

  callEpisode(link : string) : Observable<any> {
    return this.http.get<any>(link)
  }

  loadEpisode(selectedSeason : number[], seasonNumber : number){
    this.episodeList = []
    this.showList = []
    this.posterPath = `..//../assets/images/posters/season${seasonNumber}.jpg`
    this.showDetails = true
    this.selectedSeason = seasonNumber

    for(let i : number = selectedSeason[0]; i <= selectedSeason[1]; i++){
      this.callEpisode(`https://rickandmortyapi.com/api/episode/${i}`).subscribe(response => this.setEpisode(response))
      this.showList.push(false)
    }
  }

  setEpisode(response : any){
    this.episodeList.push(new Episode(response.id, response.name, response.air_date, response.episode, response.characters))
  }

  showCharacters(linkList : string[]){
    this.characterList = []

    linkList.forEach(link => {
      this.http.get<any>(link).subscribe(response => this.setCharacters(response))
    })
  }

  setCharacters(response : any){
    this.characterList.push(new Character(response.id, response.name, response.status, response.species, response.type, response.gender, response.origin.name, response.location.name, response.image, response.episode))
  }
}
