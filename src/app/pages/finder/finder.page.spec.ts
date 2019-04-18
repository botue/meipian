import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderPage } from './finder.page';

describe('FinderPage', () => {
  let component: FinderPage;
  let fixture: ComponentFixture<FinderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
