import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadalComponent } from './nadal.component';

describe('NadalComponent', () => {
  let component: NadalComponent;
  let fixture: ComponentFixture<NadalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
