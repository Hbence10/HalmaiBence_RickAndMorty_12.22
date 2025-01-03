import { Component } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {
  showInput: boolean = false
  showFilter: boolean = false
  testSelect : string = ""

  constructor(public mainService : MainServiceService){}

  showSearchInput(){
    this.showInput = !this.showInput
    if (!this.showInput){
      this.showFilter = false
    }
  }

  searchCharacter(){
    this.mainService.actualPage = 1
    this.mainService.apiCall().subscribe(response => this.mainService.setCharacter(response))
    this.mainService.setButtonNumbers(1);
  }
}
