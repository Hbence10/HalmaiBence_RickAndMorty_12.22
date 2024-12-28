import { Component } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Character } from '../../.models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: false,

  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {


  constructor(public mainsService : MainServiceService){
    mainsService.apiCall().subscribe(response => mainsService.setCharacter(response))

  }

}
