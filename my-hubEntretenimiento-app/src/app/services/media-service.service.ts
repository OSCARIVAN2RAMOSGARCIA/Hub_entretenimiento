import { Injectable } from '@angular/core';
import { MediaItem } from '../models/media-item';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaDataUrl = 'assets/data/media-data.json';
  private mediaData: { movies: MediaItem[]; series: MediaItem[] } = { movies: [], series: [] };

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  // BehaviorSubjects para los datos reactivos
  private moviesSubject = new BehaviorSubject<MediaItem[]>([]);
  private seriesSubject = new BehaviorSubject<MediaItem[]>([]);

  // Observables públicos con shareReplay para caching
  movies$ = this.moviesSubject.asObservable().pipe(shareReplay(1));
  series$ = this.seriesSubject.asObservable().pipe(shareReplay(1));

  // Cargar datos iniciales desde el JSON
  private loadInitialData(): void {
    this.http.get<{ movies: MediaItem[]; series: MediaItem[] }>(this.mediaDataUrl)
      .pipe(
        catchError(error => {
          console.error('Error loading media data:', error);
          return of({ movies: [], series: [] });
        })
      )
      .subscribe({
        next: data => {
          this.mediaData = data;
          this.moviesSubject.next([...this.mediaData.movies]);
          this.seriesSubject.next([...this.mediaData.series]);
        },
        error: err => console.error('Failed to load media data', err)
      });
  }

  // Métodos para películas (optimizados)
  getMovies(): Observable<MediaItem[]> {
    return this.movies$;
  }

  getMovieById(id: number): Observable<MediaItem | undefined> {
    return this.movies$.pipe(
      map(movies => movies.find(m => m.id === id))
    );
  }

  // Métodos para series (optimizados)
  getSeries(): Observable<MediaItem[]> {
    return this.series$;
  }

  getSerieById(id: number): Observable<MediaItem | undefined> {
    return this.series$.pipe(
      map(series => series.find(s => s.id === id))
    );
  }


  updateMovies(movies: MediaItem[]): Observable<void> {
    this.mediaData.movies = [...movies];
    this.moviesSubject.next([...this.mediaData.movies]);
    return of(undefined);
  }

  removeMovie(id: number): Observable<void> {
    this.mediaData.movies = this.mediaData.movies.filter(m => m.id !== id);
    this.moviesSubject.next([...this.mediaData.movies]);
    return of(undefined);
  }

  removeSerie(id: number): Observable<void> {
    this.mediaData.series = this.mediaData.series.filter(s => s.id !== id);
    this.seriesSubject.next([...this.mediaData.series]);
    return of(undefined);
  }

  // Métodos generales
  getAllMedia(): Observable<MediaItem[]> {
    return this.movies$.pipe(
      map(movies => {
        const series = this.seriesSubject.value;
        return [...movies, ...series];
      })
    );
  }

  getMediaByType(type: 'pelicula' | 'serie'): Observable<MediaItem[]> {
    return type === 'pelicula' ? this.getMovies() : this.getSeries();
  }

  getMediaByIdAndType(id: number, type: 'pelicula' | 'serie'): Observable<MediaItem | undefined> {
    return type === 'pelicula' ? this.getMovieById(id) : this.getSerieById(id);
  }

}
