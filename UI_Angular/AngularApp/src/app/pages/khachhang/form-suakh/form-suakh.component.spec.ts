import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuakhComponent } from './form-suakh.component';

describe('FormSuakhComponent', () => {
  let component: FormSuakhComponent;
  let fixture: ComponentFixture<FormSuakhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSuakhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSuakhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
