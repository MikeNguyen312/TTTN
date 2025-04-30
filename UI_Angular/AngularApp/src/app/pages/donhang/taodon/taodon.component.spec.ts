import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaodonComponent } from './taodon.component';

describe('TaodonComponent', () => {
  let component: TaodonComponent;
  let fixture: ComponentFixture<TaodonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaodonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaodonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
