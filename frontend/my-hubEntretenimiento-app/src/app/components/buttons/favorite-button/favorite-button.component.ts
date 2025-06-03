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
    [class.favorite]="(isFavorite$ | async)"
    [disabled]="isLoading">
    {{ (isFavorite$ | async) ? 'Favorito' : 'Agregar' }}
  </button>
  `,
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {
  private favoritesService = inject(FavoritesService);
  private destroy$ = new Subject<void>();

  @Input({ required: true }) item!: MediaItem;
  isFavorite$!: Observable<boolean>;
  isLoading = false;

  ngOnInit(): void {
    this.loadFavoriteStatus();
  }

  private loadFavoriteStatus(): void {
    this.isFavorite$ = this.favoritesService.isFavorite(this.item).pipe(
      takeUntil(this.destroy$)
    );
  }

  toggleFavorite(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.favoritesService.toggleFavorite(this.item).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.isLoading = false;
        // Recargar el estado después de cambiar
        this.loadFavoriteStatus();
      },
      error: (err) => {
        console.error('Error toggling favorite', err);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}