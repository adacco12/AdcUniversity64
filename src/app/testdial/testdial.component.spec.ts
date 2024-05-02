import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdialComponent } from './testdial.component';

describe('TestdialComponent', () => {
  let component: TestdialComponent;
  let fixture: ComponentFixture<TestdialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestdialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
