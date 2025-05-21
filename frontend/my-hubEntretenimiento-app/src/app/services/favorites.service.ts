import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, map, filter } from 'rxjs/operators';
import { MediaItem } from '../models/media-item';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // Defino una clave para guardar y recuperar los favoritos desde localStorage
  private storageKey = 'media_favorites';

  // Uso un BehaviorSubject para mantener el estado actual de los favoritos
  private _favorites = new BehaviorSubject<MediaItem[]>(this.loadFromStorage());
  
  // Expongo los favoritos como observable para que otros componentes puedan suscribirse
  favorites$ = this._favorites.asObservable();

  constructor() {
    // Carga inicial de favoritos desde almacenamiento local, si hay
    this.loadInitialFavorites();
  }

  // Verifico si hay datos almacenados y los cargo en el subject
  private loadInitialFavorites() {
    const storedFavorites = this.loadFromStorage();
    if (storedFavorites.length > 0) {
      this._favorites.next(storedFavorites);
    }
  }

  // Metodo que permite verificar si un item esta marcado como favorito
  isFavorite(item: MediaItem): Observable<boolean> {
    return this.favorites$.pipe(
      map(favs => favs.some(fav => 
        fav?.id === item?.id && fav?.tipoContenido === item?.tipoContenido
      ))
    );
  }

  // Metodo para agregar un item a la lista de favoritos, si no esta ya presente
  addToFavorites(item: MediaItem): Observable<void> {
    return new Observable(subscriber => {
      // Valido el item antes de continuar
      if (!this.isValidMediaItem(item)) {
        subscriber.error('Invalid media item');
        return;
      }

      const current = this._favorites.value;
      // Solo agrego si el item no esta ya en la lista
      if (!current.some(fav => fav.id === item.id && fav.tipoContenido === item.tipoContenido)) {
        const updated = [...current, item];
        this.updateFavorites(updated);
      }
      subscriber.next();
      subscriber.complete();
    });
  }

  // Metodo que alterna el estado de favorito: si ya esta, lo elimina; si no, lo agrega
  toggleFavorite(item: MediaItem): Observable<void> {
    return new Observable(subscriber => {
      // Verifico que el item sea valido
      if (!this.isValidMediaItem(item)) {
        subscriber.error('Invalid media item');
        return;
      }

      const current = this._favorites.value;

      // Si el item ya esta en favoritos, lo elimino; si no, lo agrego
      const updated = current.some(fav => fav.id === item.id && fav.tipoContenido === item.tipoContenido)
        ? current.filter(f => !(f.id === item.id && f.tipoContenido === item.tipoContenido))
        : [...current, item];

      this.updateFavorites(updated);
      subscriber.next();
      subscriber.complete();
    });
  }

  // Actualizo el subject y guardo en localStorage
  private updateFavorites(newFavorites: MediaItem[]): void {
    this._favorites.next(newFavorites);
    this.saveToStorage(newFavorites);
  }

  // Metodo para validar que el item tenga los datos minimos requeridos
  private isValidMediaItem(item: MediaItem): boolean {
    return !!item?.id && !!item?.tipoContenido;
  }

  // Recupero los favoritos desde localStorage, si hay datos guardados
  private loadFromStorage(): MediaItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Guardo los favoritos actuales en localStorage
  private saveToStorage(favorites: MediaItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }
}
