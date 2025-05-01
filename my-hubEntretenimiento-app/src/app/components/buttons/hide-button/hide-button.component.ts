import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MediaItem } from '../../../models/media-item';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
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

  constructor(private mediaService: MediaService) {} // Inyectamos MediaService

  ocultar(event: Event) {
    event.stopPropagation();

    // Llamada al método removeMovie o removeSerie según el tipo
    const removeOperation$ = this.item.tipo === 'pelicula' 
      ? this.mediaService.removeMovie(this.item.id) 
      : this.mediaService.removeSerie(this.item.id);

    removeOperation$.pipe(
      tap(() => {
        // Éxito: Emitimos el evento para notificar al componente padre
        this.ocultado.emit(this.item);
      }),
      catchError((error) => {
        console.error('Error al ocultar el ítem', error);
        return of(null); // Manejamos el error sin romper el flujo
      })
    ).subscribe();
  }
}