import { Injectable } from '@angular/core';
import { MediaItem } from '../models/media-item';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  // Defino la ruta al archivo JSON que contiene los datos de peliculas y series
  private mediaDataUrl = 'assets/data/media-data.json';

  // Guardo en memoria local los datos una vez cargados, para acceso rapido
  private mediaData: { movies: MediaItem[]; series: MediaItem[] } = { movies: [], series: [] };

  constructor(private http: HttpClient) {
    // Llamo al metodo de carga de datos apenas se instancia el servicio
    this.loadInitialData();
  }

  // Subjects para gestionar el flujo de datos de forma reactiva
  private moviesSubject = new BehaviorSubject<MediaItem[]>([]);
  private seriesSubject = new BehaviorSubject<MediaItem[]>([]);

  // Exponemos los observables al exterior y usamos shareReplay para evitar múltiples subscripciones innecesarias
  movies$ = this.moviesSubject.asObservable().pipe(shareReplay(1));
  series$ = this.seriesSubject.asObservable().pipe(shareReplay(1));

  // Metodo privado que se encarga de cargar los datos iniciales desde el archivo JSON
  private loadInitialData(): void {
    this.http.get<{ movies: MediaItem[]; series: MediaItem[] }>(this.mediaDataUrl)
      .pipe(
        // Capturo cualquier error y retorno un objeto vacio para que no falle la app
        catchError(error => {
          console.error('Error loading media data:', error);
          return of({ movies: [], series: [] });
        })
      )
      .subscribe({
        // Si la carga es exitosa, actualizo el estado local y los subjects
        next: data => {
          this.mediaData = data;
          this.moviesSubject.next([...this.mediaData.movies]);
          this.seriesSubject.next([...this.mediaData.series]);
        },
        // En caso de error, lo informo por consola
        error: err => console.error('Failed to load media data', err)
      });
  }

  // Devuelvo el observable con la lista de peliculas
  getMovies(): Observable<MediaItem[]> {
    return this.movies$;
  }

  // Busco una pelicula por su ID y retorno un observable con el resultado (puede ser undefined)
  getMovieById(id: number): Observable<MediaItem | undefined> {
    return this.movies$.pipe(
      map(movies => movies.find(m => m.id === id))
    );
  }

  // Devuelvo el observable con la lista de series
  getSeries(): Observable<MediaItem[]> {
    return this.series$;
  }

  // Busco una serie por su ID
  getSerieById(id: number): Observable<MediaItem | undefined> {
    return this.series$.pipe(
      map(series => series.find(s => s.id === id))
    );
  }

  // Metodo para actualizar la lista de peliculas y emitir los nuevos datos
  updateMovies(movies: MediaItem[]): Observable<void> {
    this.mediaData.movies = [...movies];
    this.moviesSubject.next([...this.mediaData.movies]);
    return of(undefined);
  }

  // Elimino una pelicula del listado segun su ID
  removeMovie(id: number): Observable<void> {
    this.mediaData.movies = this.mediaData.movies.filter(m => m.id !== id);
    this.moviesSubject.next([...this.mediaData.movies]);
    return of(undefined);
  }

  // Elimino una serie del listado segun su ID
  removeSerie(id: number): Observable<void> {
    this.mediaData.series = this.mediaData.series.filter(s => s.id !== id);
    this.seriesSubject.next([...this.mediaData.series]);
    return of(undefined);
  }

  // Combino y devuelvo tanto peliculas como series en un solo observable
  getAllMedia(): Observable<MediaItem[]> {
    return this.movies$.pipe(
      map(movies => {
        const series = this.seriesSubject.value;
        return [...movies, ...series];
      })
    );
  }

  // Devuelvo los items segun el tipo recibido ('pelicula' o 'serie')
  getMediaByType(type: 'pelicula' | 'serie'): Observable<MediaItem[]> {
    return type === 'pelicula' ? this.getMovies() : this.getSeries();
  }

  // Obtengo un item por ID segun el tipo especificado
  getMediaByIdAndType(id: number, type: 'pelicula' | 'serie'): Observable<MediaItem | undefined> {
    return type === 'pelicula' ? this.getMovieById(id) : this.getSerieById(id);
  }

}
