import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThemkhComponent } from './form-themkh.component';

describe('FormThemkhComponent', () => {
  let component: FormThemkhComponent;
  let fixture: ComponentFixture<FormThemkhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormThemkhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormThemkhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
