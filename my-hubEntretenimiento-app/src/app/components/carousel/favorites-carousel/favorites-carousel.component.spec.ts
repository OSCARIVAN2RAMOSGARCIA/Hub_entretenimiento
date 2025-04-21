import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCarouselComponent } from './favorites-carousel.component';

describe('FavoritesCarouselComponent', () => {
  let component: FavoritesCarouselComponent;
  let fixture: ComponentFixture<FavoritesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
