import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSharedComponent } from './driver-shared.component';

describe('DriverSharedComponent', () => {
  let component: DriverSharedComponent;
  let fixture: ComponentFixture<DriverSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
