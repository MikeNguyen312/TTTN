import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtkmComponent } from './ctkm.component';

describe('CtkmComponent', () => {
  let component: CtkmComponent;
  let fixture: ComponentFixture<CtkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtkmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
