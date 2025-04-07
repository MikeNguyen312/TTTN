import { TestBed } from '@angular/core/testing';

import { KhoService } from './kho.service';

describe('KhoService', () => {
  let service: KhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
