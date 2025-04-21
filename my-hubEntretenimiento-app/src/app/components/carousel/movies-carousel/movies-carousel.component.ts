import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movies-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-carousel.component.html',
  styleUrl: './movies-carousel.component.scss'
})
export class MoviesCarouselComponent {
  movies = [
    { image: 'assets/img/Avatar.webp', title: 'Movie 1' },
    { image: 'assets/img/Avatar.webp', title: 'Movie 1' },
    { image: 'assets/img/Avatar.webp', title: 'Movie 1' },
    { image: 'assets/img/Avatar.webp', title: 'Movie 1' },
    { image: 'assets/img/Avatar.webp', title: 'Movie 1' },
    { image: 'assets/img/Avatar.webp', title: 'Movie 1' }
  ];
}
