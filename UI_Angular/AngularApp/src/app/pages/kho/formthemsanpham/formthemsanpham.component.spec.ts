import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormthemsanphamComponent } from './formthemsanpham.component';

describe('FormthemsanphamComponent', () => {
  let component: FormthemsanphamComponent;
  let fixture: ComponentFixture<FormthemsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormthemsanphamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormthemsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
