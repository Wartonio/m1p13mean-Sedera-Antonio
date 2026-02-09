import { TestBed } from '@angular/core/testing';

import { CategoryproductService } from './categoryproduct.service';

describe('CategoryproductService', () => {
  let service: CategoryproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
