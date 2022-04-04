import { TestBed } from '@angular/core/testing';

import { FbconnectionService } from './fbconnection.service';

describe('FbconnectionService', () => {
  let service: FbconnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbconnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
