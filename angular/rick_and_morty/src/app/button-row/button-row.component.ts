import { Component } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-button-row',
  standalone: false,

  templateUrl: './button-row.component.html',
  styleUrl: './button-row.component.css'
})
export class ButtonRowComponent {

  constructor(public mainService : MainServiceService){}

  pageSwitch(newPage : number){
    this.mainService.apiCall().subscribe(response => this.mainService.setCharacter(response, newPage))
  }
}
