import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { About0Component } from './about0.component';

describe('About0Component', () => {
  let component: About0Component;
  let fixture: ComponentFixture<About0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ About0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(About0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
