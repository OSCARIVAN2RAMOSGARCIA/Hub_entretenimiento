import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, map, filter } from 'rxjs/operators';
import { MediaItem } from '../models/media-item';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'media_favorites';
  private _favorites = new BehaviorSubject<MediaItem[]>(this.loadFromStorage());
  
  favorites$ = this._favorites.asObservable();

  constructor() {
    // Carga inicial desde localStorage
    this.loadInitialFavorites();
  }

  private loadInitialFavorites() {
    const storedFavorites = this.loadFromStorage();
    if (storedFavorites.length > 0) {
      this._favorites.next(storedFavorites);
    }
  }

  isFavorite(item: MediaItem): Observable<boolean> {
    return this.favorites$.pipe(
      map(favs => favs.some(fav => 
        fav?.id === item?.id && fav?.tipo === item?.tipo
      ))
    );
  }

  addToFavorites(item: MediaItem): Observable<void> {
    return new Observable(subscriber => {
      if (!this.isValidMediaItem(item)) {
        subscriber.error('Invalid media item');
        return;
      }

      const current = this._favorites.value;
      if (!current.some(fav => fav.id === item.id && fav.tipo === item.tipo)) {
        const updated = [...current, item];
        this.updateFavorites(updated);
      }
      subscriber.next();
      subscriber.complete();
    });
  }

  toggleFavorite(item: MediaItem): Observable<void> {
    return new Observable(subscriber => {
      if (!this.isValidMediaItem(item)) {
        subscriber.error('Invalid media item');
        return;
      }

      const current = this._favorites.value;
      const updated = current.some(fav => fav.id === item.id && fav.tipo === item.tipo)
        ? current.filter(f => !(f.id === item.id && f.tipo === item.tipo))
        : [...current, item];

      this.updateFavorites(updated);
      subscriber.next();
      subscriber.complete();
    });
  }

  private updateFavorites(newFavorites: MediaItem[]): void {
    this._favorites.next(newFavorites);
    this.saveToStorage(newFavorites);
  }

  private isValidMediaItem(item: MediaItem): boolean {
    return !!item?.id && !!item?.tipo;
  }

  private loadFromStorage(): MediaItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(favorites: MediaItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}