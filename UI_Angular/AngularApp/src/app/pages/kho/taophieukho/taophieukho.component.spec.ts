import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaophieukhoComponent } from './taophieukho.component';

describe('TaophieukhoComponent', () => {
  let component: TaophieukhoComponent;
  let fixture: ComponentFixture<TaophieukhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaophieukhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaophieukhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
