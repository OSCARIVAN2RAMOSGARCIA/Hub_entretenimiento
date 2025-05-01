// base-carousel.component.ts
import { Component, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { FavoritesService } from '../../../services/favorites.service';
import { MediaService } from '../../../services/media-service.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

export abstract class BaseCarouselComponent {
  protected favoritesService = inject(FavoritesService);
  protected mediaService = inject(MediaService);
  
  protected currentIndexSubject = new BehaviorSubject<number>(0);
  currentIndex$ = this.currentIndexSubject.asObservable();
  
  readonly visibleItems = 8;
  readonly itemWidth = 180 + 24;

  abstract getItems$(): Observable<MediaItem[]>;

  getVisibleItems$(): Observable<MediaItem[]> {
    return combineLatest([
      this.getItems$(),
      this.currentIndex$
    ]).pipe(
      map(([items, currentIndex]) => {
        if (!items || items.length === 0) return [];
        const endIndex = Math.min(
          currentIndex + this.visibleItems, 
          items.length
        );
        return items.slice(currentIndex, endIndex);
      })
    );
  }

  next(): void {
    this.getItems$().pipe(take(1)).subscribe(items => {
      if (!items || items.length === 0) return;
      const newIndex = Math.min(
        this.currentIndexSubject.value + 1,
        Math.max(0, items.length - this.visibleItems)
      );
      this.currentIndexSubject.next(newIndex);
    });
  }

  prev(): void {
    const newIndex = Math.max(0, this.currentIndexSubject.value - 1);
    this.currentIndexSubject.next(newIndex);
  }

  trackById(_index: number, item: MediaItem): number {
    return item.id;
  }

  isFavorite(item: MediaItem): Observable<boolean> {
    return this.favoritesService.isFavorite(item);
  }

  openModal(item: MediaItem): void {
    console.log('Abrir modal para:', item.nombre);
  }

  onItemOcultado(item: MediaItem) {
    console.log('Ítem ocultado:', item.nombre);
  }
}