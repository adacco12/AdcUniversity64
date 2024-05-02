import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxscrollingComponent } from './ngxscrolling.component';

describe('NgxscrollingComponent', () => {
  let component: NgxscrollingComponent;
  let fixture: ComponentFixture<NgxscrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxscrollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxscrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
