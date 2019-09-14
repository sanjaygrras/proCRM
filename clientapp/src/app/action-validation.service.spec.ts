import { TestBed } from '@angular/core/testing';

import { ActionValidationService } from './action-validation.service';

describe('ActionValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionValidationService = TestBed.get(ActionValidationService);
    expect(service).toBeTruthy();
  });
});
