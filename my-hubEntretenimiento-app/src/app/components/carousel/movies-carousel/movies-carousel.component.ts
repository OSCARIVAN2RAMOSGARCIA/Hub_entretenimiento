import { Component } from '@angular/core';
import { FavoriteButtonComponent } from '../../buttons/favorite-button/favorite-button.component';
import { HideButtonComponent } from '../../buttons/hide-button/hide-button.component';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BaseCarouselComponent } from '../base-carousel/base-carousel.component';
import { MediaItem } from '../../../models/media-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-carousel',
  standalone: true,
  templateUrl: '../base-carousel/base-carousel.component.html',
  styleUrls: ['../base-carousel/base-carousel.component.scss'],
  imports: [
    FavoriteButtonComponent,
    HideButtonComponent,
    CommonModule,
    AsyncPipe
  ]
})
export class MoviesCarouselComponent extends BaseCarouselComponent {
  override title = 'Películas Populares';

  override getItems$(): Observable<MediaItem[]> {
    return this.mediaService.getMovies();
  }
}