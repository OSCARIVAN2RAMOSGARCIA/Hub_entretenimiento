import { Component } from '@angular/core';
import { FavoriteButtonComponent } from '../../buttons/favorite-button/favorite-button.component';
import { HideButtonComponent } from '../../buttons/hide-button/hide-button.component';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BaseCarouselComponent } from '../base-carousel/base-carousel.component';
import { MediaItem } from '../../../models/media-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-carousel',  // El selector con el que el componente puede ser usado en otras plantillas
  standalone: true,  // El componente es independiente y no requiere ser declarado en un módulo Angular
  templateUrl: '../base-carousel/base-carousel.component.html',  // Reutiliza la plantilla de `BaseCarouselComponent`
  styleUrls: ['../base-carousel/base-carousel.component.scss'],  // Reutiliza los estilos del `BaseCarouselComponent`
  imports: [
    FavoriteButtonComponent,  // Importa el botón de favorito para cada item del carrusel
    HideButtonComponent,      // Importa el botón de ocultar para cada item del carrusel
    CommonModule,             // Importa CommonModule para usar directivas comunes como `ngIf` y `ngFor`
    AsyncPipe                 // Importa AsyncPipe para manejar suscripciones a observables de manera eficiente en la plantilla
  ]
})
export class MoviesCarouselComponent extends BaseCarouselComponent {
  // Override del título para este carrusel específico (películas populares)
  override title = 'Películas Populares';

  // Implementación del método abstracto de `BaseCarouselComponent`, que devuelve los items de películas
  override getItems$(): Observable<MediaItem[]> {
    return this.mediaService.getMovies();  // Llama al servicio de medios para obtener la lista de películas
  }
}
