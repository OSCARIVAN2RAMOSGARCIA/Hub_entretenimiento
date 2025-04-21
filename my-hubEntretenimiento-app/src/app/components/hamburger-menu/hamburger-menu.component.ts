import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-hamburger-menu',
  standalone:true,
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent {
  isActive = false;

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}

