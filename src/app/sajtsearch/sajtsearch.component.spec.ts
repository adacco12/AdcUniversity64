import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SajtsearchComponent } from './sajtsearch.component';

describe('SajtsearchComponent', () => {
  let component: SajtsearchComponent;
  let fixture: ComponentFixture<SajtsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SajtsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SajtsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
