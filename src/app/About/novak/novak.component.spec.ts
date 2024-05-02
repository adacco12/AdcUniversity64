import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovakComponent } from './novak.component';

describe('NovakComponent', () => {
  let component: NovakComponent;
  let fixture: ComponentFixture<NovakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
