import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MediaItem } from '../../../models/media-item';
import { MediaService } from '../../../services/media-service.service';

@Component({
  selector: 'app-hide-button',
  standalone: true,
  templateUrl: './hide-button.component.html',
  styleUrl: './hide-button.component.scss'
})
export class HideButtonComponent {
  @Input() item: MediaItem = { 
    id: 0, 
    nombre: '', 
    img: '', 
    calificacion: '', 
    duracion: '',
    genero: '',
    tipo: '' 
  };
  @Output() ocultado = new EventEmitter<MediaItem>();

  constructor(private mediaService: MediaService) {}

  async ocultar(event: Event) {
    event.stopPropagation();

    try {
      if (this.item.tipo === 'pelicula') {
        await this.mediaService.removeMovie(this.item.id);
      } else {
        await this.mediaService.removeSerie(this.item.id);
      }
      this.ocultado.emit(this.item);
    } catch (error) {
      console.error('Error al ocultar el ítem', error);
    }
  }
}