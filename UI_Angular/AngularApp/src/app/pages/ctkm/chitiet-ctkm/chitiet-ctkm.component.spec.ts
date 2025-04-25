import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietCtkmComponent } from './chitiet-ctkm.component';

describe('ChitietCtkmComponent', () => {
  let component: ChitietCtkmComponent;
  let fixture: ComponentFixture<ChitietCtkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChitietCtkmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChitietCtkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
