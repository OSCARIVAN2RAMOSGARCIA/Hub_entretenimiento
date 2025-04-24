import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MediaItem } from '../../../models/media-item';

@Component({
  selector: 'app-favorites-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-carousel.component.html',
  styleUrl: './favorites-carousel.component.scss'
})
export class FavoritesCarouselComponent {
  favorites:MediaItem[]= [
    {
      id: 1,
      nombre: "Breaking Bad",
      genero: "Crimen, Drama, Suspenso",
      duracion: "47 min por episodio",
      calificacion: "9.5",
      img: "assets/img/breaking_bad.webp",
      tipo: "serie"
    },
    {
      id: 2,
      nombre: "Stranger Things",
      genero: "Drama, Fantasía, Horror",
      duracion: "50 min por episodio",
      calificacion: "8.8",
      img: "assets/img/stranger_things.webp",
      tipo: "serie"
    },
    {
      id: 3,
      nombre: "Game of Thrones",
      genero: "Acción, Aventura, Drama",
      duracion: "60 min por episodio",
      calificacion: "9.3",
      img: "assets/img/game_of_thrones.webp",
      tipo: "serie"
    },
    {
      id: 4,
      nombre: "The Mandalorian",
      genero: "Acción, Aventura, Fantasía",
      duracion: "40 min por episodio",
      calificacion: "8.8",
      img: "assets/img/the_mandalorian.webp",
      tipo: "serie"
    },
    {
      id: 5,
      nombre: "The Office",
      genero: "Comedia",
      duracion: "22 min por episodio",
      calificacion: "8.9",
      img: "assets/img/the_office.webp",
      tipo: "serie"
    },
    {
      id: 6,
      nombre: "Friends",
      genero: "Comedia, Romance",
      duracion: "22 min por episodio",
      calificacion: "8.9",
      img: "assets/img/friends.webp",
      tipo: "serie"
    },
    {
      id: 7,
      nombre: "The Witcher",
      genero: "Aventura, Drama, Fantasía",
      duracion: "60 min por episodio",
      calificacion: "8.0",
      img: "assets/img/the_witcher.webp",
      tipo: "serie"
    },
    {
      id: 8,
      nombre: "Black Mirror",
      genero: "Drama, Ciencia ficción, Thriller",
      duracion: "60 min por episodio",
      calificacion: "8.8",
      img: "assets/img/black_mirror.webp",
      tipo: "serie"
    },
    {
      id: 9,
      nombre: "Sherlock",
      genero: "Crimen, Drama, Misterio",
      duracion: "90 min por episodio",
      calificacion: "9.1",
      img: "assets/img/sherlock.webp",
      tipo: "serie"
    },
    {
      id: 10,
      nombre: "Narcos",
      genero: "Crimen, Drama",
      duracion: "50 min por episodio",
      calificacion: "8.8",
      img: "assets/img/narcos.webp",
      tipo: "serie"
    },
    {
      id: 11,
      nombre: "Money Heist",
      genero: "Crimen, Drama, Suspenso",
      duracion: "45 min por episodio",
      calificacion: "8.3",
      img: "assets/img/money_heist.webp",
      tipo: "serie"
    },
    {
      id: 12,
      nombre: "The Boys",
      genero: "Acción, Comedia, Crimen",
      duracion: "60 min por episodio",
      calificacion: "8.7",
      img: "assets/img/the_boys.webp",
      tipo: "serie"
    },
    {
      id: 13,
      nombre: "Peaky Blinders",
      genero: "Crimen, Drama",
      duracion: "60 min por episodio",
      calificacion: "8.8",
      img: "assets/img/peaky_blinders.webp",
      tipo: "serie"
    },
    {
      id: 14,
      nombre: "The Crown",
      genero: "Biografía, Drama, Historia",
      duracion: "60 min por episodio",
      calificacion: "8.7",
      img: "assets/img/the_crown.webp",
      tipo: "serie"
    },
    {
      id: 15,
      nombre: "The Umbrella Academy",
      genero: "Acción, Aventura, Comedia",
      duracion: "50 min por episodio",
      calificacion: "8.0",
      img: "assets/img/the_umbrella_academy.webp",
      tipo: "serie"
    },
    {
      id: 16,
      nombre: "Chernobyl",
      genero: "Drama, Historia, Thriller",
      duracion: "60 min por episodio",
      calificacion: "9.4",
      img: "assets/img/chernobyl.webp",
      tipo: "serie"
    }
  ]
  ;
}
