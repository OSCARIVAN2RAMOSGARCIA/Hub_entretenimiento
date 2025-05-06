import { Component, inject } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { FavoritesService } from '../../../services/favorites.service';
import { MediaService } from '../../../services/media-service.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, take, shareReplay, delay } from 'rxjs/operators';

// Este es un componente base para un carrusel de medios, que puede ser extendido por otros componentes específicos
export abstract class BaseCarouselComponent {
  // Inyectamos los servicios favoritos y de medios
  protected favoritesService = inject(FavoritesService);
  protected mediaService = inject(MediaService);
  
  // Variable que mantiene el índice actual del carrusel
  protected currentIndexSubject = new BehaviorSubject<number>(0);
  // Observable que emite el índice actual
  currentIndex$ = this.currentIndexSubject.asObservable();
  
  // Definimos el número de items visibles en el carrusel y el ancho de cada item
  readonly visibleItems = 8;
  readonly itemWidth = 180 + 24; // Ancho del item + margen (en píxeles)
  title = ''; // Propiedad para el título, la cual es asignada en la clase hija

  // Método abstracto para obtener los items del carrusel, implementado en los componentes derivados
  abstract getItems$(): Observable<MediaItem[]>;

  // Cacheamos los items visibles en el carrusel para mejorar el rendimiento
  private visibleItems$ = combineLatest([
    this.getItems$().pipe(shareReplay(1)),  // Obtengo los items del carrusel con caché
    this.currentIndex$
  ]).pipe(
    // Mapeo los items y el índice actual para obtener los items visibles
    map(([items, currentIndex]) => {
      if (!items || items.length === 0) return [];
      const endIndex = Math.min(
        currentIndex + this.visibleItems,  // Aseguro que no se sobrepasen los límites del arreglo
        items.length
      );
      return items.slice(currentIndex, endIndex);  // Retorno los items visibles
    }),
    shareReplay(1)  // Cacheo el resultado
  );

  // Método público para obtener los items visibles del carrusel
  getVisibleItems$(): Observable<MediaItem[]> {
    return this.visibleItems$;
  }

  // Método para avanzar al siguiente conjunto de items en el carrusel
  next(): void {
    combineLatest([
      this.getItems$().pipe(take(1)),  // Obtengo los items solo una vez
      this.currentIndex$
    ]).subscribe(([items, currentIndex]) => {
      if (!items || items.length === 0) return;
      const maxIndex = Math.max(0, items.length - this.visibleItems);  // Limito el índice máximo
      const newIndex = Math.min(currentIndex + 1, maxIndex);  // Avanzo al siguiente índice
      this.currentIndexSubject.next(newIndex);  // Actualizo el índice
    });
  }

  // Método para retroceder al conjunto anterior de items en el carrusel
  prev(): void {
    this.currentIndex$.pipe(take(1)).subscribe(currentIndex => {
      this.currentIndexSubject.next(Math.max(0, currentIndex - 1));  // Retrocedo al índice anterior, sin pasar de 0
    });
  }

  // Función trackBy para optimizar la renderización del carrusel usando el ID del item
  trackById(_index: number, item: MediaItem): number {
    return item.id;  // Utilizo el ID como clave única para cada item
  }

  // Método que verifica si un item es favorito utilizando el servicio de favoritos
  isFavorite(item: MediaItem): Observable<boolean> {
    return this.favoritesService.isFavorite(item);  // Consulta al servicio de favoritos
  }

  // Método para abrir un modal al hacer clic en un item
  openModal(item: MediaItem): void {
    console.log('Abrir modal para:', item.nombre);  // Solo un log por ahora, en la implementación real se abriría un modal
  }

  // Método que se ejecuta cuando un item es ocultado
  onItemOcultado(item: MediaItem) {
    console.log('Ítem ocultado:', item.nombre);  // Se podría actualizar la lista de items en este momento
  }
}
