import { TestBed } from '@angular/core/testing';

import { CollaborateursService } from './collaborateurs.service';

describe('CollaborateursService', () => {
  let service: CollaborateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaborateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
