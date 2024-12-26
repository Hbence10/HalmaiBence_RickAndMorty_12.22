import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  showInput: boolean = false
  showFilter: boolean = false

  constructor(){}

  showSearchInput(){
    this.showInput = !this.showInput
    if (!this.showInput){
      this.showFilter = false
    }
  }
}
