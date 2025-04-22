import { Component, OnInit } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-series-carousel',
  templateUrl: './series-carousel.component.html',
  imports:[CommonModule],
  styleUrls: ['./series-carousel.component.scss']
})
export class SeriesCarouselComponent implements OnInit {
  series: MediaItem[] = [
    { id:1,
      nombre: "Breaking Bad",
      genero: "Crimen, Drama, Suspenso",
      duracion: "47 min por episodio",
      calificacion: "9.5",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    {
      id:2,
      nombre: "Stranger Things",
      genero: "Drama, Fantasía, Horror",
      duracion: "50 min por episodio",
      calificacion: "8.8",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    {
      id:3,
      nombre: "Game of Thrones",
      genero: "Acción, Aventura, Drama",
      duracion: "60 min por episodio",
      calificacion: "9.3",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    { id:4,
      nombre: "Breaking Bad",
      genero: "Crimen, Drama, Suspenso",
      duracion: "47 min por episodio",
      calificacion: "9.5",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    {
      id:5,
      nombre: "Stranger Things",
      genero: "Drama, Fantasía, Horror",
      duracion: "50 min por episodio",
      calificacion: "8.8",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    {
      id:6,
      nombre: "Game of Thrones",
      genero: "Acción, Aventura, Drama",
      duracion: "60 min por episodio",
      calificacion: "9.3",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    { id:7,
      nombre: "Breaking Bad",
      genero: "Crimen, Drama, Suspenso",
      duracion: "47 min por episodio",
      calificacion: "9.5",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    {
      id:8,
      nombre: "Stranger Things",
      genero: "Drama, Fantasía, Horror",
      duracion: "50 min por episodio",
      calificacion: "8.8",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    },
    {
      id:9,
      nombre: "Game of Thrones",
      genero: "Acción, Aventura, Drama",
      duracion: "60 min por episodio",
      calificacion: "9.3",
      img: "assets/img/Avatar.webp",
      tipo: "serie"
    }
    // ... Agrega el resto de series aquí
  ];
    // Agrega más series según necesites

  currentIndex = 0;
  visibleItems = this.series.length;

  ngOnInit(): void {
    // Datos ya están cargados localmente
  }

  next(): void {
    if (this.currentIndex < this.series.length - this.visibleItems) {
      this.currentIndex++;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  get visibleSeries(): MediaItem[] {
    return this.series.slice(this.currentIndex, this.currentIndex + this.visibleItems);
  }

  openModal(item: MediaItem): void {
    // Emitir al componente padre o manejar aquí
  }
}