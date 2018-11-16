import { TestBed } from '@angular/core/testing';

import { ActivButtonService } from './ActivButtonService';

describe('ActivButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivButtonService = TestBed.get(ActivButtonService);
    expect(service).toBeTruthy();
  });
});
