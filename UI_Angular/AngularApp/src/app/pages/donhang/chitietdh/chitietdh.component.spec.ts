import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietdhComponent } from './chitietdh.component';

describe('ChitietdhComponent', () => {
  let component: ChitietdhComponent;
  let fixture: ComponentFixture<ChitietdhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChitietdhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChitietdhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
