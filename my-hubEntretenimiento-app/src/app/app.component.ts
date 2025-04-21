import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DatosService } from './servicios/datos.service';
import { MainCarouselComponent } from './components/main-carousel/main-carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { MoviesCarouselComponent } from './components/carousel/movies-carousel/movies-carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] , // Agregar este esquema si trabajas con Web Components
  imports: [CommonModule,HeaderComponent, MainCarouselComponent,MoviesCarouselComponent] // Asegúrate de importar ambos
})
export class AppComponent  {

}
