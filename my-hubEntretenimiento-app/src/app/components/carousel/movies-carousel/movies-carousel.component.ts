import { Component, inject } from '@angular/core';
// import { MediaItem } from '../../../models/media-item';
import { FavoriteButtonComponent } from '../../buttons/favorite-button/favorite-button.component';
import { HideButtonComponent } from '../../buttons/hide-button/hide-button.component';
// import { FavoritesService } from '../../../services/favorites.service';
// import { MediaService } from '../../../services/media-service.service';
// import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { BaseCarouselComponent } from '../base-carousel/base-carousel.component';

@Component({
  selector: 'app-movies-carousel',
  standalone: true,
  templateUrl: '../base-carousel/base-carousel.component.html',  // Ruta relativa al archivo común
  styleUrls: ['../base-carousel/base-carousel.component.scss'],
  imports: [
    FavoriteButtonComponent,
    HideButtonComponent,
    CommonModule,
    AsyncPipe
  ]
})
export class MoviesCarouselComponent extends BaseCarouselComponent {
  title = 'Películas Populares';

  override getItems$() {
    return this.mediaService.movies$;
  }
}