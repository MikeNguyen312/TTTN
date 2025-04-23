import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThemSanPhamComponent } from './formthemsanpham.component';

describe('FormthemsanphamComponent', () => {
  let component: FormThemSanPhamComponent;
  let fixture: ComponentFixture<FormThemSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormThemSanPhamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormThemSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
