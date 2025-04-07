import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhDieuHuongComponent } from './thanh-dieu-huong.component';

describe('ThanhDieuHuongComponent', () => {
  let component: ThanhDieuHuongComponent;
  let fixture: ComponentFixture<ThanhDieuHuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanhDieuHuongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanhDieuHuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
