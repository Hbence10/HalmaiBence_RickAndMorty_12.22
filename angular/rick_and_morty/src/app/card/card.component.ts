import { Component, Input } from '@angular/core';
import { Character } from '../../.models/character.model';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() character : Character
  @Input() mainPageCard : boolean = false

  constructor(public mainService : MainServiceService){}
}
