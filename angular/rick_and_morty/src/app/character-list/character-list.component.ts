import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Character } from '../../.models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: false,

  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit{

  constructor(public mainsService : MainServiceService){}

  ngOnInit(): void {
    this.mainsService.apiCall().subscribe(response => this.mainsService.setCharacter(response))
  }
}
