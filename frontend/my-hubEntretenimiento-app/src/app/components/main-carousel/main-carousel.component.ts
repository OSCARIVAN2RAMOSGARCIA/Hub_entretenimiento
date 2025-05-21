// main-carousel.component.ts
import { Component } from '@angular/core';
// @ts-ignore  // Se ignora el error de TypeScript por la falta de tipos para Swiper
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';  // Importamos Swiper y los módulos que vamos a utilizar

// Registramos los módulos de Swiper que vamos a usar
Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-main-carousel',  // Selector del componente, para usarlo en otras plantillas
  standalone: true,  // El componente es independiente y no requiere ser declarado en un módulo Angular
  templateUrl: './main-carousel.component.html',  // Ruta a la plantilla HTML del carrusel
  styleUrls: ['./main-carousel.component.scss']  // Ruta al archivo de estilos del carrusel
})
export class MainCarouselComponent {
  // El ciclo de vida ngAfterViewInit se usa para inicializar el Swiper después de que la vista ha sido renderizada
  ngAfterViewInit() {
    // Inicializamos Swiper para el carrusel
    new Swiper('.mySwiper', {
      loop: true,  // Activamos el loop para que el carrusel sea infinito
      autoplay: {  // Configuramos la reproducción automática del carrusel
        delay: 2500,  // Retraso entre cada cambio de imagen (2500 ms)
        disableOnInteraction: false  // Mantiene la reproducción automática incluso si el usuario interactúa con el carrusel
      },
      navigation: {  // Configuramos los controles de navegación
        nextEl: '.swiper-button-next',  // Selector para el botón de siguiente
        prevEl: '.swiper-button-prev'   // Selector para el botón de anterior
      },
      pagination: {  // Configuramos la paginación (los puntos abajo del carrusel)
        el: '.swiper-pagination',  // Selector para la paginación
        clickable: true  // Permite que el usuario haga clic en los puntos de paginación
      }
    });
  }
}
