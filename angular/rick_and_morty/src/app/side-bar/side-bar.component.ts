import { Component, Input } from '@angular/core';
import { Character } from '../../.models/character.model';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-side-bar',
  standalone: false,

  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Input() character : Character

  constructor(public mainService : MainServiceService){}
}
