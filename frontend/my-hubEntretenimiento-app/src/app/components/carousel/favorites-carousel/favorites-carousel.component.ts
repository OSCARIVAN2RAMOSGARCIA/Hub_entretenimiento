import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { FavoritesService } from '../../../services/favorites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites-carousel',  // Definimos el selector del componente para usarlo en las plantillas
  standalone: true,  // Componente independiente, no requiere módulo Angular
  imports: [CommonModule],  // Importamos CommonModule para usar directivas estándar como ngIf, ngFor, etc.
  templateUrl: './favorites-carousel.component.html',  // Ruta al archivo de plantilla HTML
  styleUrls: ['./favorites-carousel.component.scss']  // Ruta al archivo de estilos
})
export class FavoritesCarouselComponent {
  // Inyectamos el servicio de favoritos para manejar la lógica de los favoritos
  private favoritesService = inject(FavoritesService);

  // Usamos el observable directamente para obtener la lista de favoritos del servicio
  favorites$: Observable<MediaItem[]> = this.favoritesService.favorites$;

  // Método para optimizar la renderización del carrusel utilizando el ID único del item
  trackById(index: number, favorite: MediaItem): number {
    return favorite.id;  // El trackBy ayuda a mejorar el rendimiento al identificar cada elemento de forma única
  }

  // Método para eliminar un favorito usando el servicio `toggleFavorite`
  removeFavorite(item: MediaItem) {
    // Llamamos al método `toggleFavorite` para alternar el estado de favorito del item
    this.favoritesService.toggleFavorite(item).subscribe();  // Subscribimos para ejecutar la operación, aunque no necesitamos usar el resultado
  }
}
