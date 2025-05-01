import { Injectable } from '@angular/core';
import { MediaItem } from '../models/media-item';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaData: { movies: MediaItem[], series: MediaItem[] } = { movies: [], series: [] };
  private dataLoaded = false;

  // BehaviorSubjects para los datos reactivos
  private moviesSubject = new BehaviorSubject<MediaItem[]>([]);
  private seriesSubject = new BehaviorSubject<MediaItem[]>([]);

  // Observables públicos
  movies$ = this.moviesSubject.asObservable();
  series$ = this.seriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<{ movies: MediaItem[], series: MediaItem[] }>('assets/data/media-data.json').pipe(
      tap(data => {
        this.mediaData = data;
        this.dataLoaded = true;
        this.moviesSubject.next([...this.mediaData.movies]);
        this.seriesSubject.next([...this.mediaData.series]);
      })
    ).subscribe();
  }

  private waitForData$(): Observable<boolean> {
    return this.movies$.pipe(
      filter(movies => this.dataLoaded),
      take(1),
      map(() => true)
    );
  }

  // Métodos para películas (Promise-based)
  async getMovies(): Promise<MediaItem[]> {
    await firstValueFrom(this.waitForData$());
    return [...this.mediaData.movies];
  }

  async getMovieById(id: number): Promise<MediaItem | undefined> {
    await firstValueFrom(this.waitForData$());
    return this.mediaData.movies.find(m => m.id === id);
  }

  async updateMovies(movies: MediaItem[]): Promise<void> {
    this.mediaData.movies = [...movies];
    this.moviesSubject.next(this.mediaData.movies);
  }

  async removeMovie(id: number): Promise<void> {
    await firstValueFrom(this.waitForData$());
    this.mediaData.movies = this.mediaData.movies.filter(m => m.id !== id);
    this.moviesSubject.next([...this.mediaData.movies]);
  }

  // Métodos para series (Promise-based)
  async getSeries(): Promise<MediaItem[]> {
    await firstValueFrom(this.waitForData$());
    return [...this.mediaData.series];
  }

  async getSerieById(id: number): Promise<MediaItem | undefined> {
    await firstValueFrom(this.waitForData$());
    return this.mediaData.series.find(s => s.id === id);
  }

  async removeSerie(id: number): Promise<void> {
    await firstValueFrom(this.waitForData$());
    this.mediaData.series = this.mediaData.series.filter(s => s.id !== id);
    this.seriesSubject.next([...this.mediaData.series]);
  }

  // Métodos generales (Promise-based)
  async getAllMedia(): Promise<MediaItem[]> {
    await firstValueFrom(this.waitForData$());
    return [...this.mediaData.movies, ...this.mediaData.series];
  }

  async getMediaByType(type: 'pelicula' | 'serie'): Promise<MediaItem[]> {
    return type === 'pelicula' ? this.getMovies() : this.getSeries();
  }

  async getMediaByIdAndType(id: number, type: 'pelicula' | 'serie'): Promise<MediaItem | undefined> {
    return type === 'pelicula' ? this.getMovieById(id) : this.getSerieById(id);
  }

  // Métodos reactivos (Observable-based)
  getMoviesObservable(): Observable<MediaItem[]> {
    return this.movies$;
  }

  getSeriesObservable(): Observable<MediaItem[]> {
    return this.series$;
  }

  getAllMediaObservable(): Observable<MediaItem[]> {
    return this.movies$.pipe(
      map(movies => {
        const series = this.seriesSubject.value;
        return [...movies, ...series];
      })
    );
  }

  getMediaByTypeObservable(type: 'pelicula' | 'serie'): Observable<MediaItem[]> {
    return type === 'pelicula' ? this.movies$ : this.series$;
  }

  getMovieByIdObservable(id: number): Observable<MediaItem | undefined> {
    return this.movies$.pipe(
      map(movies => movies.find(m => m.id === id))
    );
  }

  getSerieByIdObservable(id: number): Observable<MediaItem | undefined> {
    return this.series$.pipe(
      map(series => series.find(s => s.id === id))
    );
  }
}