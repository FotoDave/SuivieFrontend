import { TestBed } from '@angular/core/testing';

import { RequettesService } from './requettes.service';

describe('RequettesService', () => {
  let service: RequettesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequettesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
