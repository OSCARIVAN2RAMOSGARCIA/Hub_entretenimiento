import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Pelicula {
  nombre: string;
  genero: string;
  duracion: string;
  calificacion: string;
  img: string;
}

export interface Serie {
  nombre: string;
  genero: string;
  duracion: string;
  calificacion: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private apiUrl = 'assets/movies.json';

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.hub_entretenimiento.peliculas)
    );
  }

  obtenerSeries(): Observable<Serie[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.hub_entretenimiento.series)
    );
  }
}
