import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FedererComponent } from './federer.component';

describe('FedererComponent', () => {
  let component: FedererComponent;
  let fixture: ComponentFixture<FedererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FedererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FedererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
