import { Component, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { FavoritesService } from '../../../services/favorites.service';
import { MediaService } from '../../../services/media-service.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, take, shareReplay, delay } from 'rxjs/operators';

export abstract class BaseCarouselComponent {
  protected favoritesService = inject(FavoritesService);
  protected mediaService = inject(MediaService);
  
  protected currentIndexSubject = new BehaviorSubject<number>(0);
  currentIndex$ = this.currentIndexSubject.asObservable();
  
  readonly visibleItems = 8;
  readonly itemWidth = 180 + 24;
  title = ''; // Propiedad para el título

  abstract getItems$(): Observable<MediaItem[]>;

  // Cacheamos los items visibles para mejor performance
  private visibleItems$ = combineLatest([
    this.getItems$().pipe(shareReplay(1)),
    this.currentIndex$
  ]).pipe(
    map(([items, currentIndex]) => {
      if (!items || items.length === 0) return [];
      const endIndex = Math.min(
        currentIndex + this.visibleItems, 
        items.length
      );
      return items.slice(currentIndex, endIndex);
    }),
    shareReplay(1)
  );

  getVisibleItems$(): Observable<MediaItem[]> {
    return this.visibleItems$.pipe(
    );
  }

  // Mejoramos la lógica de next con manejo asíncrono
  next(): void {
    combineLatest([
      this.getItems$().pipe(take(1)),
      this.currentIndex$
    ]).subscribe(([items, currentIndex]) => {
      if (!items || items.length === 0) return;
      const maxIndex = Math.max(0, items.length - this.visibleItems);
      const newIndex = Math.min(currentIndex + 1, maxIndex);
      this.currentIndexSubject.next(newIndex);
    });
  }

  prev(): void {
    this.currentIndex$.pipe(take(1)).subscribe(currentIndex => {
      this.currentIndexSubject.next(Math.max(0, currentIndex - 1));
    });
  }

  trackById(_index: number, item: MediaItem): number {
    return item.id;
  }

  isFavorite(item: MediaItem): Observable<boolean> {
    return this.favoritesService.isFavorite(item);
  }

  openModal(item: MediaItem): void {
    console.log('Abrir modal para:', item.nombre);
    // Implementación real podría usar un servicio de modal
  }

  onItemOcultado(item: MediaItem) {
    console.log('Ítem ocultado:', item.nombre);
    // Aquí podrías actualizar la lista de items
  }
}