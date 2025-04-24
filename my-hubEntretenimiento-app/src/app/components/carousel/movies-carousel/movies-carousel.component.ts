import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MediaItem } from '../../../models/media-item';

@Component({
  selector: 'app-movies-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-carousel.component.html',
  styleUrl: './movies-carousel.component.scss'
})
export class MoviesCarouselComponent {
  movies: MediaItem[] =[
    {
      id: 1,
      nombre: "Avengers: Endgame",
      genero: "Acción, Aventura, Ciencia ficción",
      duracion: "181 min",
      calificacion: "8.4",
      img: "assets/img/the_avengers.webp",
      tipo: "pelicula"
    },
    {
      id: 2,
      nombre: "Inception",
      genero: "Acción, Ciencia ficción, Misterio",
      duracion: "148 min",
      calificacion: "8.8",
      img: "assets/img/inception.webp",
      tipo: "pelicula"
    },
    {
      id: 3,
      nombre: "The Dark Knight",
      genero: "Acción, Crimen, Drama",
      duracion: "152 min",
      calificacion: "9.0",
      img: "assets/img/the_dark_nigth.webp",
      tipo: "pelicula"
    },
    {
      id: 4,
      nombre: "Titanic",
      genero: "Drama, Romance",
      duracion: "195 min",
      calificacion: "7.8",
      img: "assets/img/titanic.webp",
      tipo: "pelicula"
    },
    {
      id: 5,
      nombre: "The Matrix",
      genero: "Acción, Ciencia ficción",
      duracion: "136 min",
      calificacion: "8.7",
      img: "assets/img/the_matrix.webp",
      tipo: "pelicula"
    },
    {
      id: 6,
      nombre: "Interstellar",
      genero: "Aventura, Drama, Ciencia ficción",
      duracion: "169 min",
      calificacion: "8.6",
      img: "assets/img/interstellar.webp",
      tipo: "pelicula"
    },
    {
      id: 7,
      nombre: "The Lion King",
      genero: "Animación, Aventura, Drama",
      duracion: "88 min",
      calificacion: "8.5",
      img: "assets/img/the_lion_king.webp",
      tipo: "pelicula"
    },
    {
      id: 8,
      nombre: "Joker",
      genero: "Crimen, Drama, Thriller",
      duracion: "122 min",
      calificacion: "8.5",
      img: "assets/img/joker.webp",
      tipo: "pelicula"
    },
    {
      id: 9,
      nombre: "Forrest Gump",
      genero: "Drama, Romance",
      duracion: "142 min",
      calificacion: "8.8",
      img: "assets/img/forrest_gump.webp",
      tipo: "pelicula"
    },
    {
      id: 10,
      nombre: "Avatar",
      genero: "Acción, Aventura, Ciencia ficción",
      duracion: "162 min",
      calificacion: "7.8",
      img: "assets/img/avatar.webp",
      tipo: "pelicula"
    },
    {
      id: 11,
      nombre: "The Avengers",
      genero: "Acción, Aventura, Ciencia ficción",
      duracion: "143 min",
      calificacion: "8.0",
      img: "assets/img/the_avengers.webp",
      tipo: "pelicula"
    },
    {
      id: 12,
      nombre: "Guardians of the Galaxy",
      genero: "Acción, Aventura, Ciencia ficción",
      duracion: "121 min",
      calificacion: "8.0",
      img: "assets/img/guardians_of_the_galaxy.webp",
      tipo: "pelicula"
    },
    {
      id: 13,
      nombre: "The Pursuit of Happyness",
      genero: "Drama",
      duracion: "117 min",
      calificacion: "8.0",
      img: "assets/img/the_pursuit_of_happyness.webp",
      tipo: "pelicula"
    },
    {
      id: 14,
      nombre: "The Godfather",
      genero: "Crimen, Drama",
      duracion: "175 min",
      calificacion: "9.2",
      img: "assets/img/the_godfather.webp",
      tipo: "pelicula"
    },
    {
      id: 15,
      nombre: "Pulp Fiction",
      genero: "Crimen, Drama",
      duracion: "154 min",
      calificacion: "8.9",
      img: "assets/img/pulp_fiction.webp",
      tipo: "pelicula"
    },
    {
      id: 16,
      nombre: "The Shawshank Redemption",
      genero: "Drama",
      duracion: "142 min",
      calificacion: "9.3",
      img: "assets/img/the_shawshank_redemption.webp",
      tipo: "pelicula"
    },
    {
      id: 17,
      nombre: "The Silence of the Lambs",
      genero: "Crimen, Drama, Thriller",
      duracion: "118 min",
      calificacion: "8.6",
      img: "assets/img/the_silence_of_the_lambs.webp",
      tipo: "pelicula"
    },
    {
      id: 18,
      nombre: "The Dark Knight Rises",
      genero: "Acción, Crimen, Drama",
      duracion: "164 min",
      calificacion: "8.4",
      img: "assets/img/the_dark_knight_rises.webp",
      tipo: "pelicula"
    },
    {
      id: 19,
      nombre: "Star Wars: Episode IV - A New Hope",
      genero: "Aventura, Ciencia ficción",
      duracion: "121 min",
      calificacion: "8.6",
      img: "assets/img/star_wars:_episode_iv_-_a_new_hope.webp",
      tipo: "pelicula"
    },
    {
      id: 20,
      nombre: "Blade Runner 2049",
      genero: "Acción, Ciencia ficción, Drama",
      duracion: "163 min",
      calificacion: "8.0",
      img: "assets/img/blade_runner_2049.webp",
      tipo: "pelicula"
    },
    {
      id: 21,
      nombre: "Gladiator",
      genero: "Acción, Aventura, Drama",
      duracion: "155 min",
      calificacion: "8.5",
      img: "assets/img/gladiator.webp",
      tipo: "pelicula"
    },
    {
      id: 22,
      nombre: "The Revenant",
      genero: "Aventura, Drama, Suspenso",
      duracion: "156 min",
      calificacion: "8.0",
      img: "assets/img/the_revenant.webp",
      tipo: "pelicula"
    },
    {
      id: 23,
      nombre: "Jurassic Park",
      genero: "Acción, Aventura, Ciencia ficción",
      duracion: "127 min",
      calificacion: "8.1",
      img: "assets/img/jurassic_park.webp",
      tipo: "pelicula"
    },
    {
      id: 24,
      nombre: "Mad Max: Fury Road",
      genero: "Acción, Aventura, Ciencia ficción",
      duracion: "120 min",
      calificacion: "8.1",
      img: "assets/img/mad_max:_fury_road.webp",
      tipo: "pelicula"
    },
    {
      id: 25,
      nombre: "Deadpool",
      genero: "Acción, Comedia, Ciencia ficción",
      duracion: "108 min",
      calificacion: "8.0",
      img: "assets/img/deadpool.webp",
      tipo: "pelicula"
    },
    {
      id: 26,
      nombre: "Spider-Man: Into the Spider-Verse",
      genero: "Animación, Acción, Aventura",
      duracion: "117 min",
      calificacion: "8.4",
      img: "assets/img/spider-man:_into_the_spider-verse.webp",
      tipo: "pelicula"
    },
    {
      id: 27,
      nombre: "Spider-Man: No Way Home",
      genero: "Acción, Aventura, Ciencia ficción",
      duracion: "148 min",
      calificacion: "8.3",
      img: "assets/img/spider-man:_no_way_home.webp",
      tipo: "pelicula"
    }
  ]
  ;
    // Agrega más movies según necesites

  currentIndex = 0;
  visibleItems = this.movies.length;

  ngOnInit(): void {
    // Datos ya están cargados localmente
  }

  next(): void {
    if (this.currentIndex < this.movies.length - this.visibleItems) {
      this.currentIndex++;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  get visibleSeries(): MediaItem[] {
    return this.movies.slice(this.currentIndex, this.currentIndex + this.visibleItems);
  }

  openModal(item: MediaItem): void {
    // Emitir al componente padre o manejar aquí
  }
}
