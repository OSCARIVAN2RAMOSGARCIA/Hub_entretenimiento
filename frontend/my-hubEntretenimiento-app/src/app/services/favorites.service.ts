import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, shareReplay, catchError, finalize, tap, switchMap, take } from 'rxjs/operators';
import { MediaItem } from '../models/media-item';
import { FavoriteItem } from '../models/favorite-item';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storageKey = 'media_favorites';
  private readonly apiBaseUrl = 'http://localhost:5057/api';
  
  private currentUserIdSubject = new BehaviorSubject<number | null>(null);
  private favoritesSubject = new BehaviorSubject<MediaItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public favorites$ = this.favoritesSubject.asObservable().pipe(shareReplay(1));
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.setupUserChangeHandler();
  }

  // Métodos públicos
  setCurrentUser(userId: number | null): void {
    this.currentUserIdSubject.next(userId);
  }

  isFavorite(item: MediaItem): Observable<boolean> {
    return this.favorites$.pipe(
      map(favorites => favorites.some(fav => 
        fav.id === item.id && 
        fav.tipoContenido === item.tipoContenido
      ))
    );
  }

  addToFavorites(item: MediaItem): Observable<void> {
    return this.updateFavorites(item, 'add');
  }

  removeFromFavorites(item: MediaItem): Observable<void> {
    return this.updateFavorites(item, 'remove');
  }

  toggleFavorite(item: MediaItem): Observable<void> {
    return this.isFavorite(item).pipe(
      take(1),
      switchMap(isFavorite => {
        return isFavorite 
          ? this.removeFromFavorites(item)
          : this.addToFavorites(item);
      })
    );
  }

  // Métodos privados
  private setupUserChangeHandler(): void {
    this.currentUserIdSubject.pipe(
      switchMap(userId => {
        if (userId !== null) {
          return this.loadUserFavorites(userId);
        } else {
          this.favoritesSubject.next([]);
          return of([]);
        }
      })
    ).subscribe();
  }

  private loadUserFavorites(userId: number): Observable<MediaItem[]> {
    this.loadingSubject.next(true);
    
    const localFavorites = this.loadFromLocalStorage(userId);
    if (localFavorites.length > 0) {
      this.favoritesSubject.next(localFavorites);
    }

    return this.http.get<FavoriteItem[]>(`${this.apiBaseUrl}/favorito/usuario/${userId}`).pipe(
      map(favorites => favorites.map(this.convertApiToMediaItem)),
      tap(apiFavorites => {
        this.favoritesSubject.next(apiFavorites);
        this.saveToLocalStorage(apiFavorites, userId);
      }),
      catchError(error => {
        console.error('Error al cargar favoritos:', error);
        this.favoritesSubject.next(localFavorites);
        return of(localFavorites);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  private updateFavorites(item: MediaItem, action: 'add' | 'remove'): Observable<void> {
    return new Observable(subscriber => {
      const userId = this.currentUserIdSubject.value;
      if (userId === null) {
        subscriber.error(new Error('No hay usuario autenticado'));
        return;
      }

      if (!this.isValidMediaItem(item)) {
        subscriber.error(new Error('Media item inválido'));
        return;
      }

      const currentFavorites = this.favoritesSubject.value;
      let updatedFavorites: MediaItem[];
      let apiCall: Observable<void>;

      if (action === 'add') {
        updatedFavorites = [...currentFavorites, item];
        apiCall = this.http.post<void>(`${this.apiBaseUrl}/Favorito`, {
          idUsuario: userId,
          idContenido: item.id,
          tipoContenido: item.tipoContenido
        });
      } else {
        updatedFavorites = currentFavorites.filter(f => 
          !(f.id === item.id && f.tipoContenido === item.tipoContenido)
        );
        apiCall = this.http.delete<void>(`${this.apiBaseUrl}/Favorito`, {
          body: {
            idUsuario: userId,
            idContenido: item.id
          }
        });
      }

      // Optimistic update
      this.favoritesSubject.next(updatedFavorites);
      this.saveToLocalStorage(updatedFavorites, userId);

      apiCall.pipe(
        catchError(error => {
          console.error(`Error al ${action === 'add' ? 'añadir' : 'eliminar'} favorito:`, error);
          // Revertir cambios si falla la API
          this.favoritesSubject.next(currentFavorites);
          this.saveToLocalStorage(currentFavorites, userId);
          return throwError(() => error);
        })
      ).subscribe({
        next: () => {
          subscriber.next();
          subscriber.complete();
        },
        error: (err) => {
          subscriber.error(err);
        }
      });
    });
  }

  private convertApiToMediaItem(favorite: FavoriteItem): MediaItem {
    return {
      id: favorite.idContenido,
      nombre: favorite.nombreContenido,
      tipoContenido: favorite.tipoContenido,
      genero: favorite.genero,
      duracion: favorite.duracion,
      calificacion: favorite.calificacion,
      imagen: favorite.imagen
    };
  }

  private isValidMediaItem(item: MediaItem): boolean {
    return !!item?.id && !!item?.tipoContenido;
  }

  private loadFromLocalStorage(userId: number): MediaItem[] {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const userKey = `${this.storageKey}_${userId}`;
        const stored = localStorage.getItem(userKey);
        return stored ? JSON.parse(stored) : [];
      }
      return [];
    } catch (e) {
      console.error('Error leyendo localStorage', e);
      return [];
    }
  }

  private saveToLocalStorage(favorites: MediaItem[], userId: number): void {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const userKey = `${this.storageKey}_${userId}`;
        localStorage.setItem(userKey, JSON.stringify(favorites));
      }
    } catch (e) {
      console.error('Error guardando en localStorage', e);
    }
  }
}