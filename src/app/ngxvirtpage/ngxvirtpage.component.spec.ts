import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxvirtpageComponent } from './ngxvirtpage.component';

describe('NgxvirtpageComponent', () => {
  let component: NgxvirtpageComponent;
  let fixture: ComponentFixture<NgxvirtpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxvirtpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxvirtpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
