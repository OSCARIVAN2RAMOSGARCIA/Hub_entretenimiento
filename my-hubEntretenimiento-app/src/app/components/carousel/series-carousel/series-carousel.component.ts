import { Component, OnInit, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HideButtonComponent } from '../../buttons/hide-button/hide-button.component';
import { FavoriteButtonComponent } from '../../buttons/favorite-button/favorite-button.component';
import { FavoritesService } from '../../../services/favorites.service';
import { MediaService } from '../../../services/media-service.service';
import { BehaviorSubject, Observable, combineLatest, map, take } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-series-carousel',
  templateUrl: './series-carousel.component.html',
  imports:[CommonModule,
          HideButtonComponent,
          FavoriteButtonComponent,
          AsyncPipe],
  styleUrls: ['./series-carousel.component.scss']
})
export class SeriesCarouselComponent{
  private favoritesService = inject(FavoritesService);
  private mediaService = inject(MediaService);
  private currentIndexSubject = new BehaviorSubject<number>(0);
  
    // Agrega más series según necesites
    currentIndex$ = this.currentIndexSubject.asObservable();
    // Configuración del carrusel
  readonly visibleItems = 8;
  readonly itemWidth = 180 + 24;
  series$ = this.mediaService.series$;
    favorites$ = this.favoritesService.favorites$;

    visibleSeries$: Observable<MediaItem[]> = combineLatest([
      this.series$,
      this.currentIndex$
    ]).pipe(
      map(([series, currentIndex]) => {
        if (!series || series.length === 0) return [];
        const endIndex = Math.min(
          currentIndex + this.visibleItems, 
          series.length
        );
        return series.slice(currentIndex, endIndex);
      })
    );
  


    next(): void {
      this.series$.pipe(take(1)).subscribe(series => {
        if (!series || series.length === 0) return;
        const newIndex = Math.min(
          this.currentIndexSubject.value + 1,
          Math.max(0, series.length - this.visibleItems)
        );
        this.currentIndexSubject.next(newIndex);
      });
    }

    prev(): void {
      const newIndex = Math.max(0, this.currentIndexSubject.value - 1);
      this.currentIndexSubject.next(newIndex);
    }

    trackBySerieId(_index: number, serie: MediaItem): number {
      return serie.id;
    }
    isFavorite(serie: MediaItem): Observable<boolean> {
      return this.favoritesService.isFavorite(serie);
    }
  openModal(serie: MediaItem): void {
    console.log('Abrir modal para:', serie.nombre);
    // Implementa lógica para abrir modal aquí
  }

  onItemOcultado(item: MediaItem) {
    console.log('Ítem ocultado:', item.nombre);
    // Puedes forzar una recarga de datos si es necesario
  }


}