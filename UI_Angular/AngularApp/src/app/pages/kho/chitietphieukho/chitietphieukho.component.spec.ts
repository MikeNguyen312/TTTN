import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietphieukhoComponent } from './chitietphieukho.component';

describe('ChitietphieukhoComponent', () => {
  let component: ChitietphieukhoComponent;
  let fixture: ComponentFixture<ChitietphieukhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChitietphieukhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChitietphieukhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
