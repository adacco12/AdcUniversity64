import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TstudentComponent } from './tstudent.component';

describe('TstudentComponent', () => {
  let component: TstudentComponent;
  let fixture: ComponentFixture<TstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
