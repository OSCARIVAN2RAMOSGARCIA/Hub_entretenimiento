import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideButtonComponent } from './hide-button.component';

describe('HideButtonComponent', () => {
  let component: HideButtonComponent;
  let fixture: ComponentFixture<HideButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
