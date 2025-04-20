import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaynuComponent } from './giaynu.component';

describe('GiaynuComponent', () => {
  let component: GiaynuComponent;
  let fixture: ComponentFixture<GiaynuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaynuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaynuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
