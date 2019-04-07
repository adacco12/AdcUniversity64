import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlavnaComponent } from './glavna.component';

describe('GlavnaComponent', () => {
  let component: GlavnaComponent;
  let fixture: ComponentFixture<GlavnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlavnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlavnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
