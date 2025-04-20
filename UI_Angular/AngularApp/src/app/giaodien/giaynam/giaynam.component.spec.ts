import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaynamComponent } from './giaynam.component';

describe('GiaynamComponent', () => {
  let component: GiaynamComponent;
  let fixture: ComponentFixture<GiaynamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaynamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaynamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
