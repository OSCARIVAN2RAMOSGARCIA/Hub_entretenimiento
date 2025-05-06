import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseCarouselComponent } from './base-carousel.component';

// 1. Tipo para los items (ajusta según tu modelo real)
interface MediaItem {
  id: number;
  nombre: string;
  genero: string;
  img: string;
  tipo: 'pelicula' | 'serie';
  duracion?: string;
  calificacion?: string;
}

// 2. Interfaz extendida con métodos y propiedades
interface TestableBaseCarousel extends BaseCarouselComponent {
  items: MediaItem[];
  currentIndex: number;
  visibleSlides: number;
  
  // Métodos que serán mockeados
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  getCurrentSlide: () => MediaItem | null;
}

describe('BaseCarouselComponent', () => {
  let component: TestableBaseCarousel;
  let fixture: ComponentFixture<BaseCarouselComponent>;

  // 3. Datos de prueba realistas
  const mockItems: MediaItem[] = [
    {
      id: 1,
      nombre: "Avengers: Endgame",
      genero: "Acción",
      img: "assets/img/avengers.jpg",
      tipo: "pelicula",
      duracion: "181 min",
      calificacion: "8.4"
    },
    {
      id: 2,
      nombre: "Stranger Things",
      genero: "Drama",
      img: "assets/img/stranger.jpg",
      tipo: "serie",
      duracion: "50 min",
      calificacion: "8.8"
    }
  ];

  beforeEach(() => {
    // 4. Creación del spy con tipado completo
    const spyComponent = jasmine.createSpyObj<TestableBaseCarousel>(
      'BaseCarouselComponent',
      ['goToNextSlide', 'goToPrevSlide', 'getCurrentSlide'],
      {
        items: [...mockItems],
        currentIndex: 0,
        visibleSlides: 3
      }
    );

    // 5. Implementación de métodos mockeados
    spyComponent.goToNextSlide.and.callFake(function(this: TestableBaseCarousel) {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    });

    spyComponent.goToPrevSlide.and.callFake(function(this: TestableBaseCarousel) {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    });

    spyComponent.getCurrentSlide.and.callFake(function(this: TestableBaseCarousel) {
      return this.items[this.currentIndex] || null;
    });

    // 6. Configuración de TestBed
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(spyComponent as any);
    component = fixture.componentInstance as unknown as TestableBaseCarousel;
  });

  // 7. Pruebas
  describe('Inicialización', () => {
    it('debería crearse correctamente', () => {
      expect(component).toBeTruthy();
    });

    it('debería cargar los items iniciales', () => {
      expect(component.items.length).toBe(2);
      expect(component.items[0].nombre).toBe('Avengers: Endgame');
    });
  });

  describe('Navegación', () => {
    it('debería avanzar al siguiente slide', () => {
      component.goToNextSlide();
      expect(component.currentIndex).toBe(1);
      expect(component.getCurrentSlide()?.nombre).toBe('Stranger Things');
    });

    it('debería retroceder al slide anterior', () => {
      component.currentIndex = 1;
      component.goToPrevSlide();
      expect(component.currentIndex).toBe(0);
    });

    it('debería hacer ciclo al llegar al final', () => {
      component.currentIndex = component.items.length - 1;
      component.goToNextSlide();
      expect(component.currentIndex).toBe(0);
    });
  });
});