import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuasanphamComponent } from './suasanpham.component';

describe('SuasanphamComponent', () => {
  let component: SuasanphamComponent;
  let fixture: ComponentFixture<SuasanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuasanphamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuasanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
