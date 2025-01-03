import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-button-row',
  standalone: false,

  templateUrl: './button-row.component.html',
  styleUrl: './button-row.component.css'
})
export class ButtonRowComponent implements OnInit{

  constructor(public mainService : MainServiceService){}

  ngOnInit(): void {
    this.mainService.setButtonNumbers(1);
  }

  pageSwitch(newPage : number){
    this.mainService.setButtonNumbers(newPage);
    this.mainService.apiCall().subscribe(response => this.mainService.setCharacter(response, newPage))
  }


}
