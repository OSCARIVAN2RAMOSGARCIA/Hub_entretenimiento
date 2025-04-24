import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DatosService } from './servicios/datos.service';
import { MainCarouselComponent } from './components/main-carousel/main-carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { MoviesCarouselComponent } from './components/carousel/movies-carousel/movies-carousel.component';
import { SeriesCarouselComponent } from './components/carousel/series-carousel/series-carousel.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FavoritesCarouselComponent } from './components/carousel/favorites-carousel/favorites-carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] , // Agregar este esquema si trabajas con Web Components
  imports: 
  [
    CommonModule,
    HeaderComponent, 
    MainCarouselComponent,
    MoviesCarouselComponent,
    SeriesCarouselComponent,
    FavoritesCarouselComponent,
    HomeComponent,
    RouterOutlet
  ] // Asegúrate de importar ambos
})
export class AppComponent  {

}
