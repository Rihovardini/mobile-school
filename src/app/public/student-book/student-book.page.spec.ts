import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookPage } from './student-book.page';

describe('StudentBookPage', () => {
  let component: StudentBookPage;
  let fixture: ComponentFixture<StudentBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
