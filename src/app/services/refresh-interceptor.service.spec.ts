import { TestBed } from '@angular/core/testing';

import { RefreshInterceptorService } from './refresh-interceptor.service';

describe('RefreshInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshInterceptorService = TestBed.get(RefreshInterceptorService);
    expect(service).toBeTruthy();
  });
});
