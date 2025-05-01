import { Component, OnInit } from '@angular/core';
import { SeriesCarouselComponent } from '../../carousel/series-carousel/series-carousel.component';
import { MoviesCarouselComponent } from '../../carousel/movies-carousel/movies-carousel.component';
import { MainCarouselComponent } from '../../main-carousel/main-carousel.component';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FavoritesCarouselComponent } from '../../carousel/favorites-carousel/favorites-carousel.component';
import { MediaItem } from '../../../models/media-item';
import { MediaService } from '../../../services/media-service.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MainCarouselComponent,
    MoviesCarouselComponent,
    SeriesCarouselComponent,
    FavoritesCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredMovies: MediaItem[] = [];
  allMovies: MediaItem[] = [];
  allSeries: MediaItem[] = [];

  constructor(private mediaService: MediaService) {}

  async ngOnInit(): Promise<void> {
    this.allMovies = await this.mediaService.getMovies();
    this.allSeries = await this.mediaService.getSeries();
    this.featuredMovies = this.allMovies.filter(movie => movie.nombre);
  }
}