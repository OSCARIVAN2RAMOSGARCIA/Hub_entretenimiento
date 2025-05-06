import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MediaService } from './media-service.service';
import { take, switchMap } from 'rxjs/operators';

describe('MediaService', () => {
  let service: MediaService;
  let httpMock: HttpTestingController;

  const realMockData = {
    movies: [
      { id: 1, nombre: 'Avengers: Endgame', tipo: 'pelicula', genero: 'Acción, Aventura, Ciencia ficción', duracion: '181 min', calificacion: '8.4', img: 'assets/img/Avenger_Endgame_Poster_Oficial.webp' },
      { id: 2, nombre: 'Inception', tipo: 'pelicula', genero: 'Acción, Ciencia ficción, Misterio', duracion: '148 min', calificacion: '8.8', img: 'assets/img/inception.webp' }
    ],
    series: [
      { id: 1, nombre: 'Breaking Bad', tipo: 'serie', genero: 'Crimen, Drama, Suspenso', duracion: '47 min por episodio', calificacion: '9.5', img: 'assets/img/breaking_bad.webp' },
      { id: 2, nombre: 'Stranger Things', tipo: 'serie', genero: 'Drama, Fantasía, Horror', duracion: '50 min por episodio', calificacion: '8.8', img: 'assets/img/stranger_things.webp' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediaService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MediaService);

    // Simular la carga inicial del archivo JSON
    const req = httpMock.expectOne('assets/data/media-data.json');
    req.flush(realMockData);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly combine movies and series in getAllMedia', (done) => {
    service.getAllMedia().pipe(take(1)).subscribe(allMedia => {
      expect(allMedia.length).toBe(4);

      expect(allMedia).toContain(jasmine.objectContaining({ id: 1, nombre: 'Avengers: Endgame' }));
      expect(allMedia).toContain(jasmine.objectContaining({ id: 2, nombre: 'Inception' }));
      expect(allMedia).toContain(jasmine.objectContaining({ id: 1, nombre: 'Breaking Bad' }));
      expect(allMedia).toContain(jasmine.objectContaining({ id: 2, nombre: 'Stranger Things' }));

      expect(allMedia[0].tipo).toBe('pelicula');
      expect(allMedia[2].tipo).toBe('serie');
      done();
    });
  });

  it('should handle dynamic updates correctly', (done) => {
    const newMovie = {
      id: 10,
      nombre: 'New Movie',
      tipo: 'pelicula',
      genero: 'Action',
      duracion: '120 min',
      calificacion: '7.5',
      img: 'assets/img/new_movie.webp'
    };

    service.getMovies().pipe(
      take(1),
      switchMap(currentMovies => service.updateMovies([...currentMovies, newMovie])),
      switchMap(() => service.getAllMedia()),
      take(1)
    ).subscribe(updatedMedia => {
      expect(updatedMedia.length).toBe(5);
      expect(updatedMedia).toContain(jasmine.objectContaining({ id: 10, nombre: 'New Movie' }));
      done();
    });
  });
});
