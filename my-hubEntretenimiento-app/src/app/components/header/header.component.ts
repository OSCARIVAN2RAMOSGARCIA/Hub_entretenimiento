import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // 👈 esto permite usar <swiper-slide>, etc.
})
export class HeaderComponent {

  menuActive = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  // Cerrar menú al hacer clic fuera o cambiar tamaño de pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 760) {
      this.menuActive = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.hamburger-menu') && !target.closest('nav ul')) {
      this.menuActive = false;
    }
  }

  scrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
