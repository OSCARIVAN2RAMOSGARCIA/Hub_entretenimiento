import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // 👈 esto permite usar <swiper-slide>, etc.
})
export class HamburgerMenuComponent {

}
