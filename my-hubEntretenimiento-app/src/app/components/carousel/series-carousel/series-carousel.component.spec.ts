import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesCarouselComponent } from './series-carousel.component';

describe('SeriesCarouselComponent', () => {
  let component: SeriesCarouselComponent;
  let fixture: ComponentFixture<SeriesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
