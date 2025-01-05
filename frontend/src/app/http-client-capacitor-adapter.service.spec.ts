import { TestBed } from '@angular/core/testing';

import { HttpClientCapacitorAdapterService } from './http-client-capacitor-adapter.service';

describe('HttpClientCapacitorAdapterService', () => {
  let service: HttpClientCapacitorAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientCapacitorAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
