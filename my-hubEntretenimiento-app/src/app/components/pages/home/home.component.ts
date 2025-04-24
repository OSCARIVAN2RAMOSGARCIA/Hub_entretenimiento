import { Component } from '@angular/core';
import { SeriesCarouselComponent } from '../../carousel/series-carousel/series-carousel.component';
import { MoviesCarouselComponent } from '../../carousel/movies-carousel/movies-carousel.component';
import { MainCarouselComponent } from '../../main-carousel/main-carousel.component';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FavoritesCarouselComponent } from '../../carousel/favorites-carousel/favorites-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HeaderComponent, MainCarouselComponent,MoviesCarouselComponent,SeriesCarouselComponent,FavoritesCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
