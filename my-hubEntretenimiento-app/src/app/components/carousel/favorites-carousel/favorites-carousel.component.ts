import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { FavoritesService } from '../../../services/favorites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-carousel.component.html',
  styleUrls: ['./favorites-carousel.component.scss']
})
export class FavoritesCarouselComponent {
  private favoritesService = inject(FavoritesService);
  
  // Usamos el Observable directamente
  favorites$: Observable<MediaItem[]> = this.favoritesService.favorites$;

  trackById(index: number, favorite: MediaItem): number {
    return favorite.id;
  }

  removeFavorite(item: MediaItem) {
    this.favoritesService.toggleFavorite(item).subscribe();
  }
}