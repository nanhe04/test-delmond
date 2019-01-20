import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEarningComponent } from './driver-earning.component';

describe('DriverEarningComponent', () => {
  let component: DriverEarningComponent;
  let fixture: ComponentFixture<DriverEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
