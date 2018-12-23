import { TestBed, async, inject } from '@angular/core/testing';

import { StudentBookGuard } from './student-book.guard';

describe('StudentBookGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentBookGuard]
    });
  });

  it('should ...', inject([StudentBookGuard], (guard: StudentBookGuard) => {
    expect(guard).toBeTruthy();
  }));
});
