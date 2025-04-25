import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoKMComponent } from './tao-km.component';

describe('TaoKMComponent', () => {
  let component: TaoKMComponent;
  let fixture: ComponentFixture<TaoKMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaoKMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaoKMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
