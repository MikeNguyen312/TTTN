import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoPhieuKhoComponent } from './taophieukho.component';

describe('TaophieukhoComponent', () => {
  let component: TaoPhieuKhoComponent;
  let fixture: ComponentFixture<TaoPhieuKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaoPhieuKhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaoPhieuKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
