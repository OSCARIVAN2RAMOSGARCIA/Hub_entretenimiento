import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCarouselComponent } from './base-carousel.component';

describe('BaseCarouselComponent', () => {
  let component: BaseCarouselComponent;
  let fixture: ComponentFixture<BaseCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
