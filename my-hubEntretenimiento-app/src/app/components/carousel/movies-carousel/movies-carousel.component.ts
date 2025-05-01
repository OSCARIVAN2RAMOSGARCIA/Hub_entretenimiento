import { Component, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { FavoriteButtonComponent } from '../../buttons/favorite-button/favorite-button.component';
import { HideButtonComponent } from '../../buttons/hide-button/hide-button.component';
import { FavoritesService } from '../../../services/favorites.service';
import { MediaService } from '../../../services/media-service.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movies-carousel',
  standalone: true,
  imports: [
    FavoriteButtonComponent,
    HideButtonComponent,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './movies-carousel.component.html',
  styleUrl: './movies-carousel.component.scss'
})
export class MoviesCarouselComponent {
  private favoritesService = inject(FavoritesService);
  private mediaService = inject(MediaService);

  // Estado reactivo del carrusel
  private currentIndexSubject = new BehaviorSubject<number>(0);
  currentIndex$ = this.currentIndexSubject.asObservable();
  
  // Configuración del carrusel
  readonly visibleItems = 8;
  readonly itemWidth = 180 + 24;

  // Datos de películas
  movies$ = this.mediaService.movies$;

  // Películas visibles calculadas reactivamente
  visibleMovies$: Observable<MediaItem[]> = combineLatest([
    this.movies$,
    this.currentIndex$
  ]).pipe(
    map(([movies, currentIndex]) => {
      if (!movies || movies.length === 0) return [];
      const endIndex = Math.min(
        currentIndex + this.visibleItems, 
        movies.length
      );
      return movies.slice(currentIndex, endIndex);
    })
  );

  // Métodos de navegación mejorados
  next(): void {
    this.movies$.pipe(take(1)).subscribe(movies => {
      if (!movies || movies.length === 0) return;
      const newIndex = Math.min(
        this.currentIndexSubject.value + 1,
        Math.max(0, movies.length - this.visibleItems)
      );
      this.currentIndexSubject.next(newIndex);
    });
  }

  prev(): void {
    const newIndex = Math.max(0, this.currentIndexSubject.value - 1);
    this.currentIndexSubject.next(newIndex);
  }

  // Métodos auxiliares
  trackByMovieId(_index: number, movie: MediaItem): number {
    return movie.id;
  }

  isFavorite(movie: MediaItem): Observable<boolean> {
    return this.favoritesService.isFavorite(movie);
  }

  openModal(movie: MediaItem): void {
    console.log('Abrir modal para:', movie.nombre);
    // Implementa lógica para abrir modal aquí
  }
  onItemOcultado(item: MediaItem) {
    console.log('Ítem ocultado:', item.nombre);
    // Puedes forzar una recarga de datos si es necesario
  }
}