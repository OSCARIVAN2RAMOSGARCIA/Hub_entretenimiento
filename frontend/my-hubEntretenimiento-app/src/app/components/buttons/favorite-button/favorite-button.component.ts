import { Component, Input, inject, OnDestroy, OnInit } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { FavoritesService } from '../../../services/favorites.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [AsyncPipe],
  template: `
  <button 
  class="fav-button" 
  (click)="toggleFavorite()" 
  [class.favorite]="(isFavorite$ | async)">
{{ (isFavorite$ | async) ? 'Favorito' : 'Agregar' }}
</button>
  `,
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {
  private favoritesService = inject(FavoritesService);
  private destroy$ = new Subject<void>();

  @Input({ required: true }) item!: MediaItem;
  isFavorite$!: Observable<boolean>;

  ngOnInit() {
    this.updateFavoriteStatus();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.item).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: (err) => console.error('Error toggling favorite', err)
    });
  }

  private updateFavoriteStatus(): void {
    this.isFavorite$ = this.favoritesService.isFavorite(this.item).pipe(
      takeUntil(this.destroy$)
    );
  }
}