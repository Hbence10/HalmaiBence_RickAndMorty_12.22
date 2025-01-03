import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-season-list',
  standalone: false,

  templateUrl: './season-list.component.html',
  styleUrl: './season-list.component.css'
})
export class SeasonListComponent {
  seasons : number[][] = [[1,11], [12, 22], [22, 32], [32, 42], [42, 52]];
  posterPath : string = ""
  showDetails : boolean = false;

  constructor(public http : HttpClient){}

  callEpisode(link : string) : Observable<any> {
    return this.http.get<any>(link)
  }

  loadEpisode(selectedSeason : number[], seasonNumber : number){
    this.posterPath = `..//../assets/images/posters/season${seasonNumber}.jpg`
    this.showDetails = true
    console.log(this.posterPath)

    for(let i : number = selectedSeason[0]; i <= selectedSeason[1]; i++){
      this.callEpisode(`https://rickandmortyapi.com/api/episode/${i}`).subscribe(response => console.log(response))
    }
  }
}
