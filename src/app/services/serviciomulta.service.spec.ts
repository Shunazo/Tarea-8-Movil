import { TestBed } from '@angular/core/testing';

import { ServiciomultaService } from './serviciomulta.service';

describe('ServiciomultaService', () => {
  let service: ServiciomultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciomultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
