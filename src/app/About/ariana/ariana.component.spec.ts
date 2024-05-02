import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArianaComponent } from './ariana.component';

describe('ArianaComponent', () => {
  let component: ArianaComponent;
  let fixture: ComponentFixture<ArianaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArianaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArianaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
