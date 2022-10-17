import { TestBed } from '@angular/core/testing';

import { RequetteService } from './requette.service';

describe('RequetteService', () => {
  let service: RequetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
