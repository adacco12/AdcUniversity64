import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tstudent2Component } from './tstudent2.component';

describe('Tstudent2Component', () => {
  let component: Tstudent2Component;
  let fixture: ComponentFixture<Tstudent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tstudent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tstudent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
