import { Component, OnInit, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HideButtonComponent } from '../../buttons/hide-button/hide-button.component';
import { FavoriteButtonComponent } from '../../buttons/favorite-button/favorite-button.component';
import { FavoritesService } from '../../../services/favorites.service';
import { MediaService } from '../../../services/media-service.service';
import { BehaviorSubject, Observable, combineLatest, map, take } from 'rxjs';
import { BaseCarouselComponent } from '../base-carousel/base-carousel.component';

@Component({
  standalone: true,  // El componente es independiente y no requiere ser declarado en un módulo Angular
  selector: 'app-series-carousel',  // Selector del componente para ser utilizado en otras plantillas
  templateUrl: '../base-carousel/base-carousel.component.html',  // Reutiliza la plantilla de `BaseCarouselComponent`
  styleUrls: ['../base-carousel/base-carousel.component.scss'],  // Reutiliza los estilos del `BaseCarouselComponent`
  imports:[CommonModule,  // Importa CommonModule para usar directivas estándar como ngIf, ngFor
           HideButtonComponent,  // Importa el botón de ocultar para los items del carrusel
           FavoriteButtonComponent,  // Importa el botón de favorito para cada item del carrusel
           AsyncPipe]  // Importa el AsyncPipe para manejar suscripciones a observables de manera eficiente en la plantilla
})
export class SeriesCarouselComponent extends BaseCarouselComponent {
  // Override del título para este carrusel específico (series populares)
  override title = 'Películas Populares';  // Título que se muestra en el carrusel. Aquí parece haber un error, ya que debería ser "Series Populares" o algo relacionado con series.

  // Implementación del método abstracto de `BaseCarouselComponent`, que devuelve los items de series
  override getItems$() {
    return this.mediaService.series$;  // Llama al servicio de medios para obtener la lista de series
  }
}
