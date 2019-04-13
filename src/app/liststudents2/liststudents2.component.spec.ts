import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Liststudents2Component } from './liststudents2.component';

describe('Liststudents2Component', () => {
  let component: Liststudents2Component;
  let fixture: ComponentFixture<Liststudents2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Liststudents2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Liststudents2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
