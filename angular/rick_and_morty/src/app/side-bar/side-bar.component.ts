import { Episode } from './../../.models/episode.model';
import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../.models/character.model';
import { MainServiceService } from '../main-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-bar',
  standalone: false,

  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  @Input() character : Character
  seasons : Episode[][] = []
  seasonNumbers : number[] = []
  allEpisode : Episode[] = []

  constructor(public mainService : MainServiceService, public http : HttpClient){}

  ngOnInit(): void {
    this.character.episodeList.forEach(apiLink => {
      this.episodeCall(apiLink).subscribe(response =>{
          this.allEpisode.push(new Episode(response.id, response.name, response.air_date, response.episode, response.characters))
          this.setSeasons()
        }
      )
    })

    console.log(this.seasons)
  }

  episodeCall(link : string) : Observable<any>{
    return this.http.get(link)
  }

  setSeasons(){
    this.seasons = []
    let eachSeason : Episode[] = []
    const selectedSeasons : string[] = []

    this.allEpisode.forEach(episode => {
      if(!selectedSeasons.includes(episode.episodeNumber.slice(0, 3))){
        selectedSeasons.push(episode.episodeNumber.slice(0, 3))
        this.seasons.push(eachSeason)
        eachSeason = []
      }

      if(!this.seasonNumbers.includes(Number(episode.episodeNumber.slice(2,3)))){
        this.seasonNumbers.push(Number(episode.episodeNumber.slice(2,3)))
      }
      eachSeason.push(episode)
    })

    this.seasons.push(eachSeason)
  }
}
