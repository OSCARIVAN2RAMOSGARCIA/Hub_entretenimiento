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
  standalone: true,
  selector: 'app-series-carousel',
  templateUrl: '../base-carousel/base-carousel.component.html',  // Ruta relativa al archivo común
  styleUrls: ['../base-carousel/base-carousel.component.scss'],
  imports:[CommonModule,
          HideButtonComponent,
          FavoriteButtonComponent,
          AsyncPipe]
})
export class SeriesCarouselComponent extends BaseCarouselComponent {
  title = 'Series Populares';

  override getItems$() {
    return this.mediaService.series$;
  }
}