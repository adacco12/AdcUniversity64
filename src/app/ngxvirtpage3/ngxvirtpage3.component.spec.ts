import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ngxvirtpage3Component } from './ngxvirtpage3.component';

describe('Ngxvirtpage3Component', () => {
  let component: Ngxvirtpage3Component;
  let fixture: ComponentFixture<Ngxvirtpage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ngxvirtpage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ngxvirtpage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
